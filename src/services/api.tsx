import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Remplacez par l'URL de votre back-end
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
