import apiClient from "./ApiConfig";

const ProjectService = {
  postProject: (data) => apiClient.post("/project", data),
  getProject: (data) => apiClient.get("/project", data),
  updateProject: (projectID, data) =>
    apiClient.patch(`/project/${projectID}`, data),
};

export default ProjectService;
