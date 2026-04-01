USE telco_churn_db;

CREATE TABLE IF NOT EXISTS customers_raw (
    customer_id VARCHAR(50) PRIMARY KEY,
    gender VARCHAR(10),
    senior_citizen TINYINT,
    partner VARCHAR(10),
    dependents VARCHAR(10),
    tenure INT,
    phone_service VARCHAR(10),
    multiple_lines VARCHAR(30),
    internet_service VARCHAR(30),
    online_security VARCHAR(30),
    online_backup VARCHAR(30),
    device_protection VARCHAR(30),
    tech_support VARCHAR(30),
    streaming_tv VARCHAR(30),
    streaming_movies VARCHAR(30),
    contract_type VARCHAR(30),
    paperless_billing VARCHAR(10),
    payment_method VARCHAR(50),
    monthly_charges DECIMAL(10,2),
    total_charges DECIMAL(10,2),
    churn VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS churn_predictions (
    prediction_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50),
    model_version VARCHAR(50),
    score FLOAT,
    threshold_value FLOAT,
    prediction_label TINYINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers_raw(customer_id)
);

CREATE TABLE IF NOT EXISTS customer_id_sequence (
    seq_id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);