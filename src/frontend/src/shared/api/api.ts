import axios from 'axios';
import { TOKEN_KEY } from '../const/auth';

export const api = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

// С авторизацией
export const authApi = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

// Добавляем интерцептор для authApi
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
