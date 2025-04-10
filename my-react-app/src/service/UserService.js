import apiClient from "./ApiConfig";

const UserService = {
  getCurrentUser: (data) => apiClient.get("/user/current", data),
  updateCurrentUser: (userId, data) => apiClient.patch(`/user/${userId}`, data),
};

export default UserService;
