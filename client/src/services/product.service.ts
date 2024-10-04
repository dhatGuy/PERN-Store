import API, { publicAPI } from "~/api/axios.config";

class ProductService {
  async getProducts(page: number) {
    const res = await publicAPI.get(`/products?page=${page}`);

    return res.data;
  }
  getProductsAdmin(page) {
    return API.get(`/admin/products?page=${page}`);
  }
  async getProductBySlug(slug: string) {
    const res = await publicAPI.get(`/products/slug/${slug}`);

    return res.data;
  }
  getProduct(slug) {
    return publicAPI.get(`/products/${slug}`);
  }
  getProductByName(name) {
    return publicAPI.get(`/products/${name}`);
  }
}

export default new ProductService();
