import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI || 'http://34.107.15.74:8000', // Replace with FastAPI URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;