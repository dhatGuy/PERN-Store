import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:9000/api";

export const publicAPI = axios.create({
  baseURL,
  withCredentials: true,
});

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (req) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parsedToken = JSON.parse(token);
        if (parsedToken) req.headers["auth-token"] = parsedToken;
      }
    } catch (error) {
      console.error("🚀 ~ file: axios.config.ts:19 ~ error:", error);
    }
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
