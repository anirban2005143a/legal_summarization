# server.py

from fastapi import FastAPI, HTTPException, Response
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
    

class TranslationRequest(BaseModel):
    text: str
    target_lang: str
    

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

# HEAD endpoint
@app.head("/")
def home_head():
    # Just return headers, no body
    return Response(headers={"X-Server-Status": "Running"})

# Health check endpoint for UptimeRobot
@app.get("/health")
@app.head("/health")
def health_check():
    return {"status": "healthy", "message": "FastAPI server is running"}

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

        # trimmed_summary = trim_to_last_fullstop(summary['data'])
        # return {"summary": trimmed_summary}
        return summary

    except Exception as e:
        print("error:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


def call_gradio_translation(url: str, text: str, target_lang: str) -> str:
    import requests
    import json
    
    base_url = url.strip().rstrip("/")
    post_url = f"{base_url}/gradio_api/call/translate"
    
    payload = {
        "data": [
            text,
            target_lang
        ]
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    response = requests.post(post_url, json=payload, headers=headers, timeout=60)
    response.raise_for_status()
    event_id = response.json()["event_id"]
    
    get_url = f"{base_url}/gradio_api/call/translate/{event_id}"
    stream_response = requests.get(get_url, timeout=60)
    stream_response.raise_for_status()
    
    content = stream_response.text
    for line in content.split("\n"):
        if line.startswith("data:"):
            data_str = line[5:].strip()
            data_arr = json.loads(data_str)
            if isinstance(data_arr, list) and len(data_arr) > 0:
                return data_arr[0]
                
    raise ValueError("Could not find translation output in the response stream")


@app.post("/translate")
def translate_endpoint(data: TranslationRequest):
    try:
        url = os.getenv("GRADIO_TRANSLATION_URL")
        
        # If url is not configured or empty, run in mock mode
        if not url or url.strip() == "":
            print("⚠️ GRADIO_TRANSLATION_URL is not set. Running in Mock Mode.")
            return {
                "success": True,
                "translated_text": f"[Mock - {data.target_lang}]: {data.text}"
            }
            
        url_strip = url.strip()
        
        # If it's a Gradio URL, use the Gradio client protocol
        if "gradio" in url_strip.lower():
            translated = call_gradio_translation(url_strip, data.text, data.target_lang)
        else:
            # Custom REST API
            payload = {
                "text": data.text,
                "target_language": data.target_lang
            }
            
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            translate_url = url_strip
            if not translate_url.endswith("/translate") and not translate_url.endswith("/translate/"):
                translate_url = translate_url.rstrip("/") + "/translate"

            import requests
            response = requests.post(translate_url, json=payload, headers=headers, timeout=120)
            response.raise_for_status()
            res_json = response.json()
            
            if "translated_text" in res_json:
                translated = res_json["translated_text"]
            else:
                return {
                    "success": False,
                    "error": "Unexpected response format from translation server",
                    "details": str(res_json)
                }
                
        return {
            "success": True,
            "translated_text": translated
        }
            
    except Exception as e:
        print("Translation error:", e)
        raise HTTPException(
            status_code=500,
            detail=f"Translation error: {str(e)}"
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
