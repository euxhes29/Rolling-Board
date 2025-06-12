import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
