import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:9000/api/products";

class ProductService {
  getProducts() {
    return axios.get(API_URL, {headers: authHeader()});
  }
}

export default new ProductService();
