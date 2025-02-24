import axios from "axios";
//Api Client
const apiClient = axios.create({
  baseURL: "http://localhost:5050/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { apiClient };