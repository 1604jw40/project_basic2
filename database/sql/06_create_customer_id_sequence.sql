USE telco_churn_db;

CREATE TABLE IF NOT EXISTS customer_id_sequence (
    seq_id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);