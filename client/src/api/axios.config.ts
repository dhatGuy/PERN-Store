import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:9000/api";
const queryClient = new QueryClient();
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

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === "/auth/refresh-token") {
      return new Promise((_resolve, reject) => {
        // router.navigate("/login");
        queryClient.clear();
        localStorage.removeItem("token");

        reject(error);
      });
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await API.post("/auth/refresh-token");
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        return API(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        queryClient.clear();
        // router.navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default API;
