import apiClient from "./ApiConfig";

const AuthService = {
  login: (data) => apiClient.post("/auth", data),
  signup: (data) => apiClient.post("/auth/register", data),
};

export default AuthService;
