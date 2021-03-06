import axios from "axios";
import authHeader from "services/authHeader";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:9000/api",
      headers: authHeader()
});

export default API;
