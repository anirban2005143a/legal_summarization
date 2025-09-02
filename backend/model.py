
import requests
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer
import spacy
import time
from requests.exceptions import RequestException, Timeout

# Load environment variables
load_dotenv()

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# Initialize tokenizer once (usually at app startup)
tokenizer = AutoTokenizer.from_pretrained("AnirbanDas2005/PnHLayman" ,   token=os.getenv("HF_TOKEN") )  # Match your model

def smart_chunk_by_tokens_with_spacy(text, max_tokens_per_chunk=480):
    """
    Splits text into chunks based on model token limit,
    preserving sentence boundaries using spaCy and tokenizer.
    
    Args:
        text (str): The full input text.
        tokenizer: Hugging Face tokenizer (e.g., AutoTokenizer).
        max_tokens_per_chunk (int): Max token count per chunk (e.g., 480 for T5-base).
        
    Returns:
        List[str]: List of token-safe chunks.
    """
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]

    chunks = []
    current_chunk = []
    current_token_count = 0

    for sentence in sentences:
        # Token count for the sentence
        sentence_token_count = len(tokenizer.encode(sentence, add_special_tokens=False))

        # If adding this sentence exceeds max token count, finalize current chunk
        if current_token_count + sentence_token_count > max_tokens_per_chunk:
            if current_chunk:
                chunk_text = " ".join(current_chunk)
                chunks.append(chunk_text)
                print(f"\n🧩 Chunk {len(chunks)} | Tokens: {current_token_count}")
                if len(chunk_text) > 400:
                    preview = chunk_text[:300] + " ... " + chunk_text[-100:]
                else:
                    preview = chunk_text
                print(preview)


            # Start new chunk with current sentence
            current_chunk = [sentence]
            current_token_count = sentence_token_count
        else:
            current_chunk.append(sentence)
            current_token_count += sentence_token_count

    # Add any remaining chunk
    # if current_chunk:
    #     chunk_text = " ".join(current_chunk)
    #     chunks.append(chunk_text)
    #     print(f"\n🧩 Chunk {len(chunks)} | Tokens: {current_token_count}")
    #     print(chunk_text[:300] + ("..." if current_token_count > 300 else ""))
    if current_chunk:
        chunk_text = " ".join(current_chunk)
        chunks.append(chunk_text)
        print(f"\n🧩 Chunk {len(chunks)} | Tokens: {current_token_count}")

        # 🔽 Same preview format for final chunk
        if len(chunk_text) > 400:
            preview = chunk_text[:300] + " ... " + chunk_text[-100:]
        else:
            preview = chunk_text
        print(preview)



    return chunks


def generate_summary(text, api_url, api_token=None, summary_params=None):
    """
    Summarizes input text using Hugging Face inference endpoint with:
    - Smart sentence-aware chunking
    - Retry mechanism for 503 cold-start errors
    - Clean handling for other HTTP or network errors
    """
    if summary_params is None:
        summary_params = {
            "max_new_tokens": 128,
            "num_beams": 3,
            "length_penalty": 0.8,
            "early_stopping": False
        }

    headers = {
        "Authorization": f"Bearer {api_token or os.getenv('HF_TOKEN')}",
        "Content-Type": "application/json"
    }

    print("🔐 Headers:", headers)

    summaries = []
    for idx, chunk in enumerate(smart_chunk_by_tokens_with_spacy(text , max_tokens_per_chunk=480)):
        print(f"\n📤 Sending chunk {idx+1} to summarizer...")

        retries = 4
        delay = 20  # seconds

        for attempt in range(1, retries + 1):
            try:
                response = requests.post(
                    api_url,
                    headers=headers,
                    json={
                        "inputs": f"summarize: {chunk}",
                        "parameters": summary_params
                    },
                    # timeout=60
                )

                if response.status_code == 503:
                    raise Exception("503 Service Unavailable (model cold start)")

                # Raise error for other bad responses (400, 403, etc.)
                response.raise_for_status()

                result = response.json()
                print(result)
                summaries.append(result.get("generated_text", ""))
                break  # ✅ success, go to next chunk
    
            except requests.exceptions.HTTPError as http_err:
                # For non-503 errors: do not retry
                print(f"❌ HTTP Error for chunk {idx+1}: {response.status_code} — {response.text}")
                raise RuntimeError(f"Chunk {idx+1} failed: HTTP {response.status_code}") from http_err

            except Exception as e:
                # Retry logic for 503 or network-related errors
                print(f"⚠️ Attempt {attempt}/{retries} failed for chunk {idx+1}: {e}")
                if attempt < retries:
                    print(f"⏳ Waiting {delay}s before retrying...")
                    time.sleep(delay)
                else:
                    print("❌ Max retries reached.")
                    raise RuntimeError(
                        f"The model is waking up or unavailable. Please try again in a minute."
                    ) from e
                    
                    
        # ✅ Add the delay here, between chunk requests
        # time.sleep(0.5)  # Allow backend time to free memory before next chunk

    return " ".join(summaries)
    
    # try:
    #     response = requests.post(
    #         api_url,
    #         headers=headers,
    #         json={
    #             "inputs": f"summarize: {text}",
    #             "parameters": summary_params
    #         },
    #         timeout=60
    #     )
    #     response.raise_for_status()  # Raise error for non-200 status codes

    #     result = response.json()
    #     return result.get("generated_text", "")

    # except Timeout:
    #     print("Request timed out.")
    #     return "Error: Request timed out."
    # except RequestException as e:
    #     print(f"Request failed: {e}")
    #     return f"Error: Request failed with {str(e)}"
    # except Exception as e:
    #     print(f"Unexpected error: {e}")
    #     return f"Error: Unexpected issue - {str(e)}"
