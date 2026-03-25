LOAD DATA INFILE 'C:/telco-customer.csv'
INTO TABLE customers_raw
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(
  customer_id,
  gender,
  senior_citizen,
  partner,
  dependents,
  tenure,
  phone_service,
  multiple_lines,
  internet_service,
  online_security,
  online_backup,
  device_protection,
  tech_support,
  streaming_tv,
  streaming_movies,
  contract_type,
  paperless_billing,
  payment_method,
  monthly_charges,
  @total_charges,
  churn
)
SET total_charges = NULLIF(@total_charges, '');