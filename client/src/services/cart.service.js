import API from "../api/axios.config";

class CartService {
  getCart() {
    return API.get("/cart");
  }
  async addToCart(product_id, quantity) {
    return await API.post("/cart/add", { product_id, quantity });
  }

  async removeFromCart(product_id) {
    return await API.delete("/cart/delete", {
      data: { product_id: Number(product_id) },
    });
  }

  async increment(product_id) {
    return API.put("/cart/increment", { product_id });
  }

  async decrement(product_id) {
    return API.put("/cart/decrement", { product_id });
  }
}

export default new CartService();
