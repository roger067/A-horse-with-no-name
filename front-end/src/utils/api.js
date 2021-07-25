import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { authorization: `Bearer ${token}` },
});

export default api;
