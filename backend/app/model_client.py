import os
import requests

MODEL_API_URL = os.getenv("MODEL_API_URL", "http://127.0.0.1:8001")

def predict_customer(customer_data: dict) -> dict:
    response = requests.post(f"{MODEL_API_URL}/predict", json=customer_data)
    response.raise_for_status()
    return response.json()