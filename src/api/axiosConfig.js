import axios from "axios";

const api = axios.create({
  baseURL: "https://enotebook-backend-nosb.onrender.com",
  // baseURL: "http://localhost:1010",
  headers: {
    "Content-Type": "application/json",
  },
});

// if token exists auto attach
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["auth-token"] = token;
  }
  return req;
});

export default api;
