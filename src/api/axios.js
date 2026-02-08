import axios from "axios";


// Base URL from environment variables (Netlify / Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically - this runs before every request is sent
api.interceptors.request.use(
  (config) => {
    // get token from localstorage
    const token = localStorage.getItem("token");

    // if token exists, attach it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // always return config
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
