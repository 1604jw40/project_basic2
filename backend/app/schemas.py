from pydantic import BaseModel
from typing import Optional


class CustomerCreate(BaseModel):
    customer_id: str
    gender: str
    senior_citizen: int
    partner: str
    dependents: str
    tenure: int
    phone_service: str
    multiple_lines: str
    internet_service: str
    online_security: str
    online_backup: str
    device_protection: str
    tech_support: str
    streaming_tv: str
    streaming_movies: str
    contract_type: str
    paperless_billing: str
    payment_method: str
    monthly_charges: float
    total_charges: Optional[float] = 0.0
    churn: Optional[str] = None


class PredictionResult(BaseModel):
    customer_id: str
    score: float
    threshold: float
    prediction_label: int