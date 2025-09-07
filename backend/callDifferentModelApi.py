# import requests
# from model import generate_summary  # Ensure this is present



# def call_t5_model(api_url, api_token, text, params):
#     if params is None:
#         params = {}

#     payload = {
#         "inputs": text,
#         "parameters": {
#             "max_new_tokens": 128,
#             "num_beams": 3,
#             "length_penalty": 0.8,
#             "early_stopping": False
#         }
#     }

#     headers = {
#         # "Authorization": f"Bearer {api_token}",
#         "Content-Type": "application/json",
#         "Accept": "application/json"
#     }

#     # print("Request payload:", payload)
#     response = requests.post(api_url, headers=headers, json=payload)
#     response.raise_for_status()
#     data = response.json()

#     # Handle both dict and list response formats
#     if isinstance(data, dict):
#         if "generated_text" in data:
#             return data["generated_text"]
#         elif "summary" in data:
#             return data["summary"]
#         else:
#             return data
#     elif isinstance(data, list) and len(data) > 0:
#         return data[0].get("generated_text", data[0])
#     else:
#         return data


# def call_phi4_model(api_url, api_token, text, params=None):
#     if params is None:
#         params = {}
        
#     payload = {
#         "inputs": text,
#         "max_new_tokens": params.get("max_new_tokens", 512),
#         "temperature": params.get("temperature", 0.7)
#     }
#     headers = {
#         "Authorization": f"Bearer {api_token}",
#         "Content-Type": "application/json",
#         "Accept": "application/json"
#     }
#     # print(payload)
#     response = requests.post(api_url, headers=headers, json=payload)
#     response.raise_for_status()
#     data = response.json()

#     return data.get("summary") if isinstance(data, dict) else data[0]["generated_text"]



import requests
import time


def call_t5_model(api_url, api_token, text, params=None):
    if params is None:
        params = {}

    payload = {
        "inputs": f"summarize: {text}",
        "parameters": {
            "max_new_tokens": params.get("max_new_tokens", 128),
            "num_beams": params.get("num_beams", 3),
            "length_penalty": params.get("length_penalty", 0.8),
            "early_stopping": params.get("early_stopping", False),
        }
    }

    headers = {
        # "Authorization": f"Bearer {api_token}",   # uncomment if endpoint requires token
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    retries = 4
    delay = 20  # seconds

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=60)

            if response.status_code == 503:
                raise Exception("503 Service Unavailable (model cold start)")

            response.raise_for_status()
            data = response.json()

            if isinstance(data, dict):
                return data.get("generated_text") or data.get("summary") or data
            elif isinstance(data, list) and len(data) > 0:
                return data[0].get("generated_text", data[0])
            else:
                return data

        except Exception as e:
            print(f"⚠️ Attempt {attempt}/{retries} failed: {e}")
            if attempt < retries:
                print(f"⏳ Waiting {delay}s before retrying...")
                time.sleep(delay)
            else:
                raise RuntimeError(
                    f"T5 model endpoint unavailable after {retries} attempts. Try again later."
                ) from e


def call_phi4_model(api_url, api_token, text, params=None):
    if params is None:
        params = {}

    payload = {
        "inputs": text,
        "max_new_tokens": params.get("max_new_tokens", 512),
        "temperature": params.get("temperature", 0.7)
    }

    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    retries = 10
    delay = 30  # seconds

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=60)

            if response.status_code == 503:
                raise Exception("503 Service Unavailable (model cold start)")

            response.raise_for_status()
            data = response.json()

            if isinstance(data, dict):
                return data.get("summary") or data.get("generated_text") or data
            elif isinstance(data, list) and len(data) > 0:
                return data[0].get("generated_text", data[0])
            else:
                return data

        except Exception as e:
            print(f"⚠️ Attempt {attempt}/{retries} failed: {e}")
            if attempt < retries:
                print(f"⏳ Waiting {delay}s before retrying...")
                time.sleep(delay)
            else:
                raise RuntimeError(
                    f"Phi-4 model endpoint unavailable after {retries} attempts. Try again later."
                ) from e
