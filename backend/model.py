
import requests
import os
from dotenv import load_dotenv
from transformers import AutoTokenizer
import spacy
import time

# Load environment variables
load_dotenv()

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# Initialize tokenizer once (usually at app startup)
tokenizer = AutoTokenizer.from_pretrained("AnirbanDas2005/PnHLayman" ,   token=os.getenv("HF_TOKEN") )  # Match your model

def smart_chunk_with_spacy(text, max_chunks=5):
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]
    sentence_word_counts = [len(sent.split()) for sent in sentences]
    
    total_words = sum(sentence_word_counts)
    target_words_per_chunk = max(total_words // max_chunks, 1)

    chunks = []
    current_chunk = []
    current_word_count = 0

    for i, (sentence, word_count) in enumerate(zip(sentences, sentence_word_counts)):
        if current_word_count + word_count > target_words_per_chunk and len(chunks) < max_chunks - 1:
            # Finish current chunk
            chunks.append(" ".join(current_chunk))
            print(f"\n🧩 Chunk {len(chunks)} | Words: {current_word_count}")
            print(" ".join(current_chunk)[:300] + ("..." if current_word_count > 300 else ""))
            
            current_chunk = [sentence]
            current_word_count = word_count
        else:
            current_chunk.append(sentence)
            current_word_count += word_count

    # Add final chunk
    if current_chunk:
        chunks.append(" ".join(current_chunk))
        print(f"\n🧩 Chunk {len(chunks)} | Words: {current_word_count}")
        print(" ".join(current_chunk)[:300] + ("..." if current_word_count > 300 else ""))

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
            "max_new_tokens": 300,
            "num_beams": 4,
            "length_penalty": 0.8,
            "early_stopping": False
        }

    headers = {
        "Authorization": f"Bearer {api_token or os.getenv('HF_TOKEN')}",
        "Content-Type": "application/json"
    }

    print("🔐 Headers:", headers)

    summaries = []
    for idx, chunk in enumerate(smart_chunk_with_spacy(text)):
        print(f"\n📤 Sending chunk {idx+1} to summarizer...")

        retries = 3
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
                    timeout=60
                )

                if response.status_code == 503:
                    raise Exception("503 Service Unavailable (model cold start)")

                # Raise error for other bad responses (400, 403, etc.)
                response.raise_for_status()

                result = response.json()
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

    return " ".join(summaries)
