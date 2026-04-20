import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://payo-app.duckdns.org:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => {
  const credentials = Keychain.getGenericPassword();
  if (credentials) {
    return credentials.password;
  }
  return null;
};

// ✅ CORRECT FOR YOUR BACKEND
api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;

        
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log('Interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;