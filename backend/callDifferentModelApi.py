import requests
from model import generate_summary  # Ensure this is present



def call_t5_model(api_url, api_token, text, params):
    
    # Generate summary
    summary = generate_summary(
        text=text,
        api_url=api_url,
        api_token=api_token,
        summary_params=params
    )
    
    return summary


def call_phi4_model(api_url, api_token, text, params):
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
    print(payload)
    response = requests.post(api_url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()

    return data.get("summary") if isinstance(data, dict) else data[0]["generated_text"]
