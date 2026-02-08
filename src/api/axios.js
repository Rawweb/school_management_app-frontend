import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
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
