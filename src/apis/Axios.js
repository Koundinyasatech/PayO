import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach admin JWT to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("payo_admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally — clear token and return to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("payo_admin_token");
      localStorage.removeItem("payo_admin_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
