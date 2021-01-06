import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:9000/api/products";

class ProductService {
  getProducts(page, limit) {
    return axios.get(API_URL + `?page=${page}`);
  }
  getProduct(id) {
    return axios.get(API_URL + "/" +id, {headers: authHeader()});
  }
}

export default new ProductService();
