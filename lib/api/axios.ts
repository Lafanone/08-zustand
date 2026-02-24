import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const rawToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const token = rawToken ? rawToken.replace(/"/g, '') : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});