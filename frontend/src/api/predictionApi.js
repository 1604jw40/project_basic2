import { api } from './client';

export async function predictCustomer(payload) {
  const response = await api.post('/customers/predict', payload);
  return response.data;
}

export async function fetchHighRiskCustomers() {
  const response = await api.get('/predictions/high-risk');
  return response.data;
}

export async function checkHealth() {
  const response = await api.get('/health');
  return response.data;
}
