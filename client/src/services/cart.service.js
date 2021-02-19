import API from "../api/axios.config";

class CartService {
  createCart() {
    return API.post("/cart/create");
  }
  getCart(user_id) {
    return API.get("/cart");
  }
  addToCart(cart_id, product_id, quantity) {
    return API.post("/cart/add", { cart_id, product_id, quantity });
  }

  async removeFromCart(cart_id, product_id) {
    return await API.delete("/cart/delete", {
      data: { cart_id: Number(cart_id), product_id: Number(product_id) },
    });
  }

  async increment(cart_id, product_id) {
    return API.put("/cart/increment", { cart_id, product_id });
  }

  async decrement(cart_id, product_id) {
    return API.put("/cart/decrement", { cart_id, product_id });
  }
}

export default new CartService();
