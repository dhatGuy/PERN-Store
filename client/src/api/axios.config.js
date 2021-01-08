import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://nameless-journey-88760.herokuapp.com/api"
      : "http://localhost:9000/api",
});

export default API;
