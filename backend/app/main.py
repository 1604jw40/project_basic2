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

origins = [
    "http://localhost:5173",
    "https://sw-project-num2-front.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
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

        customer_id = generate_next_customer_id(conn)
        customer_data["customer_id"] = customer_id

        insert_customer(conn, customer_data)

        prediction = predict_customer(customer_data)

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