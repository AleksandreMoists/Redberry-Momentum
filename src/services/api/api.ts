// src/services/api.ts - Base API configuration
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';
const API_TOKEN = '9e6e183c-aced-455d-902c-fb6eba59124b';

localStorage.setItem('auth_token', API_TOKEN);

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    
    if (config.headers) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 403:
          console.log('Forbidden access');
          break;
        case 500:
          console.log('Server error');
          break;
        default:
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;