import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        localStorage.removeItem("accessToken");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error.response || error);
  }
);

export default apiClient;
