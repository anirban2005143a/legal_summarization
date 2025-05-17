import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# # Load model and tokenizer
# tokenizer = AutoTokenizer.from_pretrained("satviksh09/PnHLayman")
# model = AutoModelForSeq2SeqLM.from_pretrained("satviksh09/PnHLayman")

# # Set device
# device = "cuda" if torch.cuda.is_available() else "cpu"
# model.to(device)

# Chunking function
def chunk_text(text, max_length=1024):
    words = text.split()
    chunks = []
    chunk = []

    for word in words:
        chunk.append(word)
        if len(chunk) > max_length:
            chunks.append(' '.join(chunk[:-1]))
            chunk = [chunk[-1]]
    if chunk:
        chunks.append(' '.join(chunk))
    return chunks

# Summary generation function
def generate_summary(model, tokenizer, case_text, device="cuda"):
    chunks = chunk_text(case_text, max_length=1024)
    all_summaries = []

    for chunk in chunks:
        inputs = tokenizer(chunk, return_tensors="pt", truncation=True, padding="longest", max_length=1024)
        inputs = {key: value.to(device) for key, value in inputs.items()}
        summary_ids = model.generate(
            inputs['input_ids'],
            attention_mask=inputs['attention_mask'],
            max_new_tokens=128,
            num_beams=8,
            early_stopping=True,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id,
            no_repeat_ngram_size=3,
            length_penalty=0.8
        )
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        all_summaries.append(summary)

    return " ".join(all_summaries)

# Paths
# judgments_dir = "Judgments"
# summaries_dir = "Summaries"
# os.makedirs(summaries_dir, exist_ok=True)

# # Process each file
# for filename in os.listdir(judgments_dir):
#     if filename.endswith(".txt"):
#         with open(os.path.join(judgments_dir, filename), "r", encoding="utf-8") as f:
#             case_text = f.read()

#         summary = generate_summary(model, tokenizer, case_text, device)

#         with open(os.path.join(summaries_dir, filename), "w", encoding="utf-8") as f:
#             f.write(summary)

# generate_summary(model , tokenizer , "tell me about what you know" , device)