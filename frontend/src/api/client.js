import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://interplacental-liana-puddly.ngrok-free.dev';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});
