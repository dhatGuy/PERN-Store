import API from "api/axios.config";

class ProductService {
  getProducts(page) {
    return API.get(`/products/?page=${page}`);
  }
  getProduct(id) {
    return API.get(`/products/${id}`);
  }
  getProductByName(name) {
    return API.get(`/products/${name}`);
  }
}

export default new ProductService();
