from fastapi import FastAPI
from model_api.app.schemas import CustomerRawInput, PredictionResponse
from model_api.app.predictor import predict_from_raw_customer

app = FastAPI(title="Model API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict(customer: CustomerRawInput):
    result = predict_from_raw_customer(customer.dict())
    return result