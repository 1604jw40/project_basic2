const REQUIRED_FIELDS = [
  "gender",
  "senior_citizen",
  "partner",
  "dependents",
  "tenure",
  "phone_service",
  "multiple_lines",
  "internet_service",
  "online_security",
  "online_backup",
  "device_protection",
  "tech_support",
  "streaming_tv",
  "streaming_movies",
  "contract_type",
  "paperless_billing",
  "payment_method",
  "monthly_charges",
];

export const NUMERIC_RULES = {
  tenure: { min: 0, max: 120, label: "가입 개월 수" },
  monthly_charges: { min: 0, max: 200, label: "월 요금" },
  total_charges: { min: 0, max: 20000, label: "누적 요금" },
};

export function normalizePayload(values) {
  return {
    gender: values.gender,
    senior_citizen: Number(values.senior_citizen),
    partner: values.partner,
    dependents: values.dependents,
    tenure: Number(values.tenure),
    phone_service: values.phone_service,
    multiple_lines: values.multiple_lines,
    internet_service: values.internet_service,
    online_security: values.online_security,
    online_backup: values.online_backup,
    device_protection: values.device_protection,
    tech_support: values.tech_support,
    streaming_tv: values.streaming_tv,
    streaming_movies: values.streaming_movies,
    contract_type: values.contract_type,
    paperless_billing: values.paperless_billing,
    payment_method: values.payment_method,
    monthly_charges: Number(values.monthly_charges),
    total_charges:
      values.total_charges === '' || values.total_charges === null
        ? 0
        : Number(values.total_charges),
    churn: null,
  };
}

export function validateForm(values) {
  const errors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (values[field] === '' || values[field] === null || values[field] === undefined) {
      errors[field] = '필수값입니다.';
    }
  });

  Object.entries(NUMERIC_RULES).forEach(([field, rule]) => {
    const rawValue = values[field];
    if (field === 'total_charges' && (rawValue === '' || rawValue === null)) {
      return;
    }

    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) {
      errors[field] = `${rule.label}는 숫자여야 합니다.`;
      return;
    }

    if (numericValue < rule.min || numericValue > rule.max) {
      errors[field] = `${rule.label}는 ${rule.min}~${rule.max} 범위여야 합니다.`;
    }
  });

  if (values.internet_service === 'No') {
    const relatedFields = [
      'online_security',
      'online_backup',
      'device_protection',
      'tech_support',
      'streaming_tv',
      'streaming_movies',
    ];

    relatedFields.forEach((field) => {
      if (values[field] !== 'No internet service') {
        errors[field] = '인터넷 없음 선택 시 자동으로 No internet service여야 합니다.';
      }
    });
  }

  return errors;
}
