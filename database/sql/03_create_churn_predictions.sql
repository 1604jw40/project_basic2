CREATE TABLE churn_predictions (
    prediction_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50),
    model_version VARCHAR(50),
    score FLOAT,
    threshold_value FLOAT,
    prediction_label TINYINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers_raw(customer_id)
);