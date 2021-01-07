import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://nameless-journey-88760.herokuapp.com/api/products";

class ProductService {
  getProducts(page, limit) {
    return axios.get(API_URL + `?page=${page}`);
  }
  getProduct(id) {
    return axios.get(API_URL + "/" +id, {headers: authHeader()});
  }
}

export default new ProductService();
