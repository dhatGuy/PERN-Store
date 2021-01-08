import API from "api/axios.config";
import authHeader from "./authHeader";

class ProductService {
  getProducts(page, limit) {
    return API.get(`/products/?page=${page}`);
  }
  getProduct(id) {
    return API.get( `/products/${id}`, {headers: authHeader()});
  }
}

export default new ProductService();
