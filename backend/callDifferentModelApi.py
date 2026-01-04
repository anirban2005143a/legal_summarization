# -------------------------------------------------
# API CALL TO HUGGINGFACE INTERFACE ENDPOINT API
# -------------------------------------------------

import requests
import time
import os
from dotenv import load_dotenv


load_dotenv()

# response = """The person appealing the case (the appellant) was found guilty by a judge under a specific law (Section 302 of the Indian Penal Code). He was sentenced to life in prison for murder.\n\nThe appellant said he didn't hit his wife. But, before the judge, he admitted to hitting her with a dao (a type of knife). He said she died because of the injuries. He also said he was guilty.\n\nA police officer (PW 1) said the appellant admitted to hitting his wife with a dao and killing her. He also said the appellant asked him to write a report to the police (an ejahar).\n\nAnother witness (PW 2) said he saw the appellant with a dao and the report. He said the appellant told the police he cut his wife and gave them the report.\n\nThe appellant's wife had been having an affair with someone else when he found her.\n\nThe appellant's wife had many cuts on her body. The doctor said she died because of the shock and bleeding from the cuts.\n\nThe court decided that the appellant's admission to the police officer was like a statement made right after the crime. This type of statement is allowed as evidence. The officer's testimony, along with the appellant's actions (writing the report and giving it to the police), supported the admission.\n\nThe court also said that if the only evidence is the defendant's (the person accused of a crime) admission, the prosecution (the lawyers trying to prove guilt) and the court must accept it as true. There should be no other evidence to check or confirm any part of the admission.\n\nIn this case, the admission must be accepted as a whole, including the parts that try to excuse the crime.\n\nThe court also said that the appellant's actions were a response to a serious and sudden provocation (a situation that causes someone to act out of anger). This means the crime should be seen as \"culpable homicide not amounting to murder\" (a less serious crime than murder). This is because the law (Section 300 of the Indian Penal Code) allows for this exception."""

# def call_t5_model(api_url, api_token, text, params=None):
#     if params is None:
#         params = {}

#     payload = {
#         "inputs": f"summarize: {text}",
#         "parameters": {
#             "max_new_tokens": params.get("max_new_tokens", 128),
#             "num_beams": params.get("num_beams", 3),
#             "length_penalty": params.get("length_penalty", 0.8),
#             "early_stopping": params.get("early_stopping", False),
#         }
#     }

#     headers = {
#         # "Authorization": f"Bearer {api_token}",   # uncomment if endpoint requires token
#         "Content-Type": "application/json",
#         "Accept": "application/json"
#     }

#     retries = 4
#     delay = 20  # seconds

#     for attempt in range(1, retries + 1):
#         try:
#             response = requests.post(api_url, headers=headers, json=payload, timeout=180)

#             if response.status_code == 503:
#                 raise Exception("503 Service Unavailable (model cold start)")

#             response.raise_for_status()
#             data = response.json()

#             if isinstance(data, dict):
#                 return data.get("generated_text") or data.get("summary") or data
#             elif isinstance(data, list) and len(data) > 0:
#                 return data[0].get("generated_text", data[0])
#             else:
#                 return data

#         except Exception as e:
#             print(f"⚠️ Attempt {attempt}/{retries} failed: {e}")
#             if attempt < retries:
#                 print(f"⏳ Waiting {delay}s before retrying...")
#                 time.sleep(delay)
#             else:
#                 raise RuntimeError(
#                     f"T5 model endpoint unavailable after {retries} attempts. Try again later."
#                 ) from e


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

#     retries = 10
#     delay = 30  # seconds

#     for attempt in range(1, retries + 1):
#         try:
#             response = requests.post(api_url, headers=headers, json=payload, timeout=180)

#             if response.status_code == 503:
#                 raise Exception("503 Service Unavailable (model cold start)")

#             response.raise_for_status()
#             data = response.json()

#             if isinstance(data, dict):
#                 return data.get("summary") or data.get("generated_text") or data
#             elif isinstance(data, list) and len(data) > 0:
#                 return data[0].get("generated_text", data[0])
#             else:
#                 return data

#         except Exception as e:
#             print(f"⚠️ Attempt {attempt}/{retries} failed: {e}")
#             if attempt < retries:
#                 print(f"⏳ Waiting {delay}s before retrying...")
#                 time.sleep(delay)
#             else:
#                 raise RuntimeError(
#                     f"Phi-4 model endpoint unavailable after {retries} attempts. Try again later."
#                 ) from e


# -------------------------------------------------
# API CALL TO RUNPOD SERVERLESS ENDPOINT
# -------------------------------------------------

def call_phi4_model(api_url, api_token, text, params=None):
    if params is None:
        params = {}

    payload = {
        "input": {
            "text": f"summarize - {text}",
            "max_new_tokens": 1024,
            "chunk_tokens": 2000,
            "do_sample": False,
            "temperature": 0.0
        }
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ['RUNPOD_API_KEY']}"
    }
    
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP errors

        print(response.json())
        return {"success": True, "summary": response.json()["output"]["summary"]["generated_text"]}



        # time.sleep(3)
        # print(response)
        # return {"success": True, "summary": response}
    except requests.exceptions.HTTPError as http_err:
        raise RuntimeError(f"HTTP error occurred: {http_err}") from http_err

    except requests.exceptions.ConnectionError as conn_err:
        raise RuntimeError(f"Connection error occurred: {conn_err}") from conn_err

    except requests.exceptions.Timeout as timeout_err:
        raise RuntimeError(f"Timeout error occurred: {timeout_err}") from timeout_err

    except requests.exceptions.RequestException as req_err:
        raise RuntimeError(f"Request error occurred: {req_err}") from req_err

    except Exception as e:
        raise RuntimeError(f"Unexpected error occurred: {e}") from e


def call_t5_model(api_url, api_token, text, params=None):
    if params is None:
        params = {}

    payload = {
        "input": {
            "text": f"summarize - {text}",
            "max_new_tokens": 350,
            "num_beams": 5,
            "early_stopping": True,
            "length_penalty": 1,
            "no_repeat_ngram_size": 3,
            "chunk_tokens": 900,
            "chunk_overlap": 50
        }
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ['RUNPOD_API_KEY']}"
    }

    
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP errors

        print(response.json())
        return {"success": True, "summary": response.json()["output"]["summary"]["generated_text"]}
        
        
        # time.sleep(3)
        # print(response)
        return {"success": True, "summary": response}
    except requests.exceptions.HTTPError as http_err:
        raise RuntimeError(f"HTTP error occurred: {http_err}") from http_err

    except requests.exceptions.ConnectionError as conn_err:
        raise RuntimeError(f"Connection error occurred: {conn_err}") from conn_err

    except requests.exceptions.Timeout as timeout_err:
        raise RuntimeError(f"Timeout error occurred: {timeout_err}") from timeout_err

    except requests.exceptions.RequestException as req_err:
        raise RuntimeError(f"Request error occurred: {req_err}") from req_err

    except Exception as e:
        raise RuntimeError(f"Unexpected error occurred: {e}") from e

