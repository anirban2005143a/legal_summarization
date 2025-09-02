# server.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
import io
import PyPDF2
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from dotenv import load_dotenv
from typing import Optional  # Add this import
# import torch
import os
from model import generate_summary  # Ensure this is present
# torch.set_num_threads(os.cpu_count())

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS setup
origins = os.getenv("CORS_ORIGINS", "*").split(",")
print(origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # Load model and tokenizer
# tokenizer = AutoTokenizer.from_pretrained("./model/PnHLayman")
# model = AutoModelForSeq2SeqLM.from_pretrained("./model/PnHLayman")

# # Set device
# device = "cuda" if torch.cuda.is_available() else "cpu"
# model.to(device)

class GenerationParams(BaseModel):
    max_new_tokens: Optional[int] = 128
    num_beams: Optional[int] = 3
    length_penalty: Optional[float] = 0.8
    early_stopping: Optional[bool] = False
    temperature: Optional[float] = None  # Optional params
    no_repeat_ngram_size: Optional[int] = None

class InputText(BaseModel):
    text: str
    parameters: Optional[GenerationParams] = None  # Nested params
    

def trim_to_last_fullstop(text):
    last_dot_index = text.rfind('.')
    if last_dot_index != -1:
        return text[:last_dot_index + 1]
    return text  # Return original if no full stop found

@app.get("/")
def home():
    return {"message": "FastAPI server running"}

@app.post("/predict")
def predict(data: InputText):
    try:
        # Get token from environment
        api_token = os.getenv("HF_TOKEN")
        if not api_token:
            raise ValueError("API token not found in environment variables")
        
        api_url = "https://y7xodfsssvsb59sa.us-east-1.aws.endpoints.huggingface.cloud"
        
         # Use provided parameters or defaults
        params = data.parameters or GenerationParams()
        summary_params = params.dict(exclude_none=True)  # Remove None values
        
        print(summary_params)
        
        # Generate summary
        summary = generate_summary(
            text=data.text,
            api_url=api_url,
            api_token=api_token,
            summary_params=summary_params
        )
        
        trimmed_summary = trim_to_last_fullstop(summary)
        return {"summary": trimmed_summary}

    except Exception as e:
        print("error" , e)
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: Please try again"
        )


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        
        return JSONResponse({"text": text})
    except Exception as e:
        return JSONResponse({"error": "Extraction failed", "details": str(e)}, status_code=500)