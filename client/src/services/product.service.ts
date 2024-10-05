import API, { publicAPI } from "~/api/axios.config";
import { apiResponseSchema } from "~/enitities/apiResponse";
import { paginatedProductsSchema, productSchema } from "~/enitities/product";

class ProductService {
  async getProducts(page: number) {
    const res = await publicAPI.get(`/products?page=${page}`);

    return paginatedProductsSchema.parse(res.data);
  }
  getProductsAdmin(page) {
    return API.get(`/admin/products?page=${page}`);
  }
  async getProductBySlug(slug: string) {
    const res = await publicAPI.get(`/products/slug/${slug}`);

    return apiResponseSchema(productSchema).parse(res.data);
  }
  async getProduct(id: number) {
    const res = await publicAPI.get(`/products/${id}`);

    return apiResponseSchema(productSchema).parse(res.data);
  }
  async getProductByName(name: string) {
    const res = await publicAPI.get(`/products/${name}`);

    return apiResponseSchema(productSchema).parse(res.data);
  }
}

export default new ProductService();
