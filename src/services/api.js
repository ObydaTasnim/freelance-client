import axios from "axios";

// Debug logging
console.log("🔍 API Base URL:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://freelance-server-beta.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
      console.error("❌ Network Error: Cannot connect to server!");
      console.error("📍 Server URL:", import.meta.env.VITE_API_URL);
      console.error("💡 Make sure the server is running!");
    }
    console.error("❌ API Error:", error.message);
    return Promise.reject(error);
  },
);

// Job API calls
export const jobAPI = {
  getAll: (params = {}) => {
    // Build query parameters
    const queryParams = new URLSearchParams();

    // Add all parameters to query string
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams.append(key, params[key]);
      }
    });

    // Convert to query string
    const queryString = queryParams.toString();

    // Make the API call
    return API.get(`/api/jobs${queryString ? `?${queryString}` : ""}`);
  },

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
