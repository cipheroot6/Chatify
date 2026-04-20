import axios from "axios";

export const axiosInstance = axios.create({
  // Use a relative base URL so that:
  // - In development: Vite's proxy forwards /api/* to localhost:3000 (no CORS)
  // - In production: Vercel rewrites /api/* to the serverless function (no CORS)
  // Never use an absolute localhost URL here — it breaks production.
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
