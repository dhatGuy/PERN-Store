import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:9000/api";

function handleSessionExpiration() {
  toast.error("Session Expired");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}
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
      // will try to refresh token if expired
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
        handleSessionExpiration();

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
        handleSessionExpiration();
      }
    }
    return Promise.reject(error);
  }
);

export default API;
