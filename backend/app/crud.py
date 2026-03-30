def generate_next_customer_id(conn) -> str:
    """
    중복 방지를 위해 customer_id_sequence 테이블의 AUTO_INCREMENT를 사용
    예: NEW_000001, NEW_000002
    """
    sql = "INSERT INTO customer_id_sequence () VALUES ()"

    with conn.cursor() as cursor:
        cursor.execute(sql)
        seq_id = cursor.lastrowid

    return f"NEW_{seq_id:06d}"


def insert_customer(conn, customer: dict):
    sql = """
    INSERT INTO customers_raw (
        customer_id, gender, senior_citizen, partner, dependents,
        tenure, phone_service, multiple_lines, internet_service,
        online_security, online_backup, device_protection, tech_support,
        streaming_tv, streaming_movies, contract_type, paperless_billing,
        payment_method, monthly_charges, total_charges, churn
    ) VALUES (
        %s, %s, %s, %s, %s,
        %s, %s, %s, %s,
        %s, %s, %s, %s,
        %s, %s, %s, %s,
        %s, %s, %s, %s
    )
    """
    values = (
        customer["customer_id"],
        customer["gender"],
        customer["senior_citizen"],
        customer["partner"],
        customer["dependents"],
        customer["tenure"],
        customer["phone_service"],
        customer["multiple_lines"],
        customer["internet_service"],
        customer["online_security"],
        customer["online_backup"],
        customer["device_protection"],
        customer["tech_support"],
        customer["streaming_tv"],
        customer["streaming_movies"],
        customer["contract_type"],
        customer["paperless_billing"],
        customer["payment_method"],
        customer["monthly_charges"],
        customer.get("total_charges", 0.0),
        customer.get("churn")
    )

    with conn.cursor() as cursor:
        cursor.execute(sql, values)


def insert_prediction(conn, prediction: dict):
    sql = """
    INSERT INTO churn_predictions (
        customer_id, model_version, score, threshold_value, prediction_label
    ) VALUES (%s, %s, %s, %s, %s)
    """
    values = (
        prediction["customer_id"],
        "xgb_v1",
        prediction["score"],
        prediction["threshold"],
        prediction["prediction_label"],
    )

    with conn.cursor() as cursor:
        cursor.execute(sql, values)


def get_high_risk_customers(conn):
    sql = """
    SELECT cp.*
    FROM churn_predictions cp
    JOIN (
        SELECT customer_id, MAX(prediction_id) AS max_id
        FROM churn_predictions
        GROUP BY customer_id
    ) latest
      ON cp.customer_id = latest.customer_id
     AND cp.prediction_id = latest.max_id
    WHERE cp.prediction_label = 1
    ORDER BY cp.score DESC
    """
    with conn.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()