import axios from "axios";
import authHeader from "services/authHeader";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:9000/api",
      headers: authHeader()
});

API.interceptors.request.use(
  function(req) {
    const token = JSON.parse(localStorage.getItem("token"))
    if(token) req.headers["auth-token"] = token
    return req;
  }, 
  function(error) {
    return Promise.reject(error);
  }
)

export default API;
