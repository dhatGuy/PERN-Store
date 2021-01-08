import axios from "axios";

const API = axios.create({
  baseURL: 'https://nameless-journey-88760.herokuapp.com/api',
  // baseURL: 'http://localhost:9000/api',
});

export default API;
