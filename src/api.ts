import axios from "axios";

const api = axios.create({
  baseURL: "localhost:8080/books",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
