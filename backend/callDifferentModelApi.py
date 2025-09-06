import requests
from model import generate_summary  # Ensure this is present



def call_t5_model(api_url, api_token, text, params):
    if params is None:
        params = {}

    payload = {
        "inputs": text,
        "parameters": {
            "max_new_tokens": 128,
            "num_beams": 3,
            "length_penalty": 0.8,
            "early_stopping": False
        }
    }

    headers = {
        # "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    # print("Request payload:", payload)
    response = requests.post(api_url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()

    # Handle both dict and list response formats
    if isinstance(data, dict):
        if "generated_text" in data:
            return data["generated_text"]
        elif "summary" in data:
            return data["summary"]
        else:
            return data
    elif isinstance(data, list) and len(data) > 0:
        return data[0].get("generated_text", data[0])
    else:
        return data


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
    # print(payload)
    response = requests.post(api_url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()

    return data.get("summary") if isinstance(data, dict) else data[0]["generated_text"]
