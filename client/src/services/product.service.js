import API from "api/axios.config";

class ProductService {
  getProducts(page, limit) {
    return API.get(`/products/?page=${page}`);
  }
  getProduct(id) {
    return API.get( `/products/${id}`);
  }
}

export default new ProductService();
