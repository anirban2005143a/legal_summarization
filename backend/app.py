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
import os
from callDifferentModelApi import call_t5_model, call_phi4_model

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

class GenerationParams(BaseModel):
    max_new_tokens: Optional[int] = 128
    num_beams: Optional[int] = 3
    length_penalty: Optional[float] = 0.8
    early_stopping: Optional[bool] = False
    temperature: Optional[float] = None  # Optional params
    no_repeat_ngram_size: Optional[int] = None

class InputText(BaseModel):
    text: str
    model_name: str  
    parameters: Optional[GenerationParams] = None
    

def trim_to_last_fullstop(text: str) -> str:
    if not text or not isinstance(text, str):
        return ""   # or just return text if you prefer None-safe

    last_dot_index = text.rfind(".")
    if last_dot_index != -1:
        return text[:last_dot_index + 1]
    return text


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

        # Load API URL from env using model_name
        model_key = data.model_name.upper().replace("-", "_")  # e.g. T5_BASE → T5_BASE_URL
        api_url = None
        if "t5" in model_key.lower():
            api_url = os.getenv("T5_URL")  # set this in .env
        elif "phi4" in model_key.lower():
            api_url = os.getenv("PHI4_URL")  # set this in .env
        
        if not api_url:
            raise ValueError(f"No API URL found for model: {data.model_name}")

        # Use provided parameters or defaults
        params = data.parameters or GenerationParams()
        summary_params = params.dict(exclude_none=True)  # Remove None values

        print("Summary Params:", summary_params)

        # Call appropriate function based on model name
        if "t5" in data.model_name.lower():
            summary = call_t5_model(
                text=data.text,
                api_url=api_url,
                api_token=api_token,
                # params=summary_params
            )
        elif "phi4" in data.model_name.lower():
            summary = call_phi4_model(
                text=data.text,
                api_url=api_url,
                api_token=api_token,
                # params=summary_params
            )
        else:
            raise ValueError(f"Unsupported model: {data.model_name}")

        trimmed_summary = trim_to_last_fullstop(summary)
        return {"summary": trimmed_summary}

    except Exception as e:
        print("error:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        filename = file.filename.lower()

        # Handle PDF files
        if filename.endswith(".pdf") or file.content_type == "application/pdf":
            reader = PyPDF2.PdfReader(io.BytesIO(contents))
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""

        # Handle TXT files
        elif filename.endswith(".txt") or file.content_type == "text/plain":
            text = contents.decode("utf-8", errors="ignore")  # Decode bytes to string

        else:
            return JSONResponse(
                {"error": "Unsupported file type. Only PDF and TXT are supported."},
                status_code=400
            )

        return JSONResponse({"text": text})
        
    except Exception as e:
        return JSONResponse(
            {"error": "Extraction failed", "details": str(e)},
            status_code=500
        )
