# API Specification

## Base URL
- Local: http://127.0.0.1:8000
- Shared via ngrok: 별도 공지

---

## POST /customers/predict

### Request
```json
{
  "gender": "Female",
  "senior_citizen": 0,
  "partner": "Yes",
  "dependents": "No",
  "tenure": 12,
  "phone_service": "Yes",
  "multiple_lines": "No",
  "internet_service": "DSL",
  "online_security": "Yes",
  "online_backup": "No",
  "device_protection": "Yes",
  "tech_support": "No",
  "streaming_tv": "Yes",
  "streaming_movies": "No",
  "contract_type": "Month-to-month",
  "paperless_billing": "Yes",
  "payment_method": "Electronic check",
  "monthly_charges": 79.5,
  "total_charges": 954.0,
  "churn": null
}

예시
{
  "customer_id": "NEW_000001",
  "score": 0.812345,
  "threshold": 0.5625625625625625,
  "prediction_label": 1
}