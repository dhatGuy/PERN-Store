import axios from "axios";

const instance = axios.create({
  baseURL: 'https://nameless-journey-88760.herokuapp.com/api',
  timeout: 1000
});

export default instance;
