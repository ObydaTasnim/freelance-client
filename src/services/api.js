import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://freelance-server-beta.vercel.app",
});

// Job API calls
export const jobAPI = {
  getAll: (sortBy) => API.get(`/api/jobs${sortBy ? `?sort=${sortBy}` : ""}`),
  getLatest: () => API.get("/api/jobs/latest"),
  getById: (id) => API.get(`/api/jobs/${id}`),
  getByUserEmail: (email) => API.get(`/api/jobs/user/${email}`),
  create: (jobData) => API.post("/api/jobs", jobData),
  update: (id, jobData) => API.put(`/api/jobs/${id}`, jobData),
  delete: (id) => API.delete(`/api/jobs/${id}`),
};

// Accepted Task API calls
export const acceptedTaskAPI = {
  getByEmail: (email) => API.get(`/api/accepted-tasks/${email}`),
  accept: (taskData) => API.post("/api/accepted-tasks", taskData),
  delete: (id) => API.delete(`/api/accepted-tasks/${id}`),
};

export default API;
