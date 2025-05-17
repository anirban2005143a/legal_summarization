from flask import Flask, request, jsonify
from model import generate_summary  # Make sure this file is in the same directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load variables from .env
load_dotenv()

app = Flask(__name__)

# Get CORS origins from env, default to '*'
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
CORS(app, origins=cors_origins)

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("satviksh09/PnHLayman")
model = AutoModelForSeq2SeqLM.from_pretrained("satviksh09/PnHLayman")

# Set device
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

@app.route("/", methods=["GET"])
def Home():
    return "Flask server running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.get_json()
        # print(input_data)
        if input_data is None:
            return jsonify({"error": "Invalid input, JSON expected"}), 400

        output = generate_summary(
            model, tokenizer, input_data["text"], device
        )
        return jsonify({"output": output})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
