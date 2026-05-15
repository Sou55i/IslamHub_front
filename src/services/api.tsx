/**
 * Client API pour le backend Express
 * Utilisé en mode 'express' comme fallback si Supabase n'est pas disponible
 */

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
