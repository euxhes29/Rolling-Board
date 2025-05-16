import apiClient from "./ApiConfig";

const TaskService = {
  postColumn: (data) => apiClient.post("/task/status/", data),
  getColumns: (id, data) => apiClient.get(`/project/${id}`, data),
  deleteColumn: (columnId, data) =>
    apiClient.delete(`/task/status/${columnId}`, data),
  postTask: (data) => apiClient.post("/task", data),
  deleteTask: (taskId, data) => apiClient.delete(`/task/${taskId}`, data),
  getTaskId: (currentTaskId, data) =>
    apiClient.get(`/task/${currentTaskId}`, data),
  getUsers: (data) => apiClient.get("/user", data),
  updateTask: (currentTaskId, data) =>
    apiClient.patch(`/task/${currentTaskId}`, data),
  updateDragAndDrop: (movedTask, data) =>
    apiClient.patch(`/task/${movedTask.id}`, data),
};

export default TaskService;
