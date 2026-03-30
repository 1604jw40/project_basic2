# python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload-dir backend

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.app.schemas import CustomerCreate
from backend.app.db import get_connection
from backend.app.crud import (
    generate_next_customer_id,
    insert_customer,
    insert_prediction,
    get_high_risk_customers,
)
from backend.app.model_client import predict_customer

app = FastAPI(title="Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/customers/predict")
def create_customer_and_predict(customer: CustomerCreate):
    conn = get_connection()

    try:
        customer_data = customer.dict()

        # 중복 없는 신규 customer_id 생성
        customer_id = generate_next_customer_id(conn)
        customer_data["customer_id"] = customer_id

        # 원본 저장
        insert_customer(conn, customer_data)

        # 모델 API 호출
        prediction = predict_customer(customer_data)

        # 예측 저장
        insert_prediction(conn, prediction)

        conn.commit()
        return prediction

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        conn.close()


@app.get("/predictions/high-risk")
def high_risk_list():
    conn = get_connection()
    try:
        rows = get_high_risk_customers(conn)
        return rows
    finally:
        conn.close()
        
@app.get("/")
def root():
    return {
        "message": "Backend API is running",
        "docs": "/docs",
        "health": "/health"
    }