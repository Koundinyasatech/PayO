import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://13.204.47.143:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ CORRECT FOR YOUR BACKEND
api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;

        console.log('TOKEN SENT:', token); // 🔍 debug

        // ✅ NO Bearer
        config.headers.Authorization = token;
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