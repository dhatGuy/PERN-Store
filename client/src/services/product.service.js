import API from "api/axios.config";

class ProductService {
  getProducts(page) {
    return API.get(`/products?page=${page}`);
  }
  getProductsAdmin(page) {
    return API.get(`/admin/products?page=${page}`);
  }
  getProduct(slug) {
    return API.get(`/products/${slug}`);
  }
  getProductByName(name) {
    return API.get(`/products/${name}`);
  }
}

export default new ProductService();
