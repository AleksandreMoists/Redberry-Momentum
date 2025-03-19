// src/api.ts 
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Must match proxy server port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;