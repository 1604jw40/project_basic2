import pandas as pd


def yes_no_to_int(value):
    return 1 if str(value).strip() == "Yes" else 0


def gender_to_int(value):
    # 학습 시 gender가 숫자화되어 있었다면
    # Male=1, Female=0 방식으로 맞추는 경우가 일반적
    return 1 if str(value).strip() == "Male" else 0


def multiple_lines_to_int(value):
    # 'Yes'면 1, 'No' 또는 'No phone service'면 0
    return 1 if str(value).strip() == "Yes" else 0


def build_feature_row(customer: dict) -> dict:
    online_security = yes_no_to_int(customer["online_security"])
    online_backup = yes_no_to_int(customer["online_backup"])
    device_protection = yes_no_to_int(customer["device_protection"])
    tech_support = yes_no_to_int(customer["tech_support"])
    streaming_tv = yes_no_to_int(customer["streaming_tv"])
    streaming_movies = yes_no_to_int(customer["streaming_movies"])

    total_charges = (
        float(customer["total_charges"])
        if customer["total_charges"] is not None
        else 0.0
    )

    feature_row = {
        "gender": gender_to_int(customer["gender"]),
        "SeniorCitizen": int(customer["senior_citizen"]),
        "Partner": yes_no_to_int(customer["partner"]),
        "Dependents": yes_no_to_int(customer["dependents"]),
        "Subscription_Months": float(customer["tenure"]),
        "PhoneService": yes_no_to_int(customer["phone_service"]),
        "MultipleLines": multiple_lines_to_int(customer["multiple_lines"]),
        "OnlineSecurity": online_security,
        "OnlineBackup": online_backup,
        "DeviceProtection": device_protection,
        "TechSupport": tech_support,
        "StreamingTV": streaming_tv,
        "StreamingMovies": streaming_movies,
        "PaperlessBilling": yes_no_to_int(customer["paperless_billing"]),
        "Monthly_Fee": float(customer["monthly_charges"]),
        "Cumulative_Revenue": total_charges,
        "Active_Features_Count": (
            online_security
            + online_backup
            + device_protection
            + tech_support
            + streaming_tv
            + streaming_movies
        ),
        "InternetService_DSL": 1 if customer["internet_service"] == "DSL" else 0,
        "InternetService_Fiber optic": 1 if customer["internet_service"] == "Fiber optic" else 0,
        "InternetService_No": 1 if customer["internet_service"] == "No" else 0,
        "Billing_Cycle_Month-to-month": 1 if customer["contract_type"] == "Month-to-month" else 0,
        "Billing_Cycle_One year": 1 if customer["contract_type"] == "One year" else 0,
        "Billing_Cycle_Two year": 1 if customer["contract_type"] == "Two year" else 0,
        "PaymentMethod_Bank transfer (automatic)": 1 if customer["payment_method"] == "Bank transfer (automatic)" else 0,
        "PaymentMethod_Credit card (automatic)": 1 if customer["payment_method"] == "Credit card (automatic)" else 0,
        "PaymentMethod_Electronic check": 1 if customer["payment_method"] == "Electronic check" else 0,
        "PaymentMethod_Mailed check": 1 if customer["payment_method"] == "Mailed check" else 0,
    }

    return feature_row


def transform_customer_to_dataframe(customer: dict, feature_names: list) -> pd.DataFrame:
    feature_row = build_feature_row(customer)
    df = pd.DataFrame([feature_row])
    df = df.reindex(columns=feature_names, fill_value=0)
    return df