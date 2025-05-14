# T5 Base – Legal Case Briefs Fine-Tuned Model

**Model Name:** `t5-base-legal-case-briefs`
**Base Model:** [google-t5/t5-base](https://huggingface.co/google-t5/t5-base)
---

## Model Overview

This model is a fine-tuned version of Google's T5 Base model, specifically adapted for legal Natural Language Processing (NLP) tasks. By training on a substantial corpus of Indian legal case briefs, it has acquired a nuanced understanding of legal language, terminology, and structures prevalent in Indian jurisprudence.

---



### Datasets

* **IIT KGP Legal Case Briefs:** A curated dataset comprising 7,000 legal case summaries (https://huggingface.co/datasets/satviksh09/hf_legal_dataset).
* **Punjab & Haryana Layman Dataset:** [Hosted on Hugging Face](https://huggingface.co/datasets/satviksh09/punjab_haryana_layman), this dataset contains simplified legal summaries to enhance model understanding of accessible legal language.


---

## Evaluation Results

https://docs.google.com/document/d/1GFUWX52QkCPnFVmOQdbNRvANWJ2qD5Syvm3ZsmAkBBs/edit?tab=t.idvitrb0124z

*Evaluated on a held-out portion of the IIT KGP dataset.*

---

## Steps to Run

Prepare the directory structure as follows:

```
Folder/
├── script.py
├── Judgments/
│   ├── 1.txt
│   └── 2.txt
└── Summaries/
    ├── 1.txt
    └── 2.txt
```

Place your judgment text files inside the Judgments/ folder.

Run the script:
script.py

The generated summaries will be saved in the Summaries/ folder with the same filenames.
