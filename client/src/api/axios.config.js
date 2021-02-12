import axios from "axios";

const token = JSON.parse(localStorage.getItem('user'))?.token;

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:9000/api",
      headers: {
        'auth-token': token
      }
});

export default API;
