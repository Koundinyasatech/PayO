import axios from 'axios';

const api = axios.create({
  baseURL: 'https://evacuative-idolisingly-cherie.ngrok-free.dev', // 🔥 change later
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;