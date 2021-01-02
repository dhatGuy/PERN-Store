import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:9000/api/cart/";

const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

class CartService {
  createCart() {
    return axios.post(
      API_URL + "create",
      {
        userId: Number(userId),
      },
      {
        headers: authHeader(),
      }
    );
  }
  getCart(user_id) {
    return axios.post(
      API_URL,
      {
        userId: Number(user_id),
      },
      {
        headers: authHeader(),
      }
    );
  }
  addToCart(cart_id, product_id, quantity) {
    return axios.post(
      API_URL + "add",
      { cart_id, product_id, quantity },
      { headers: authHeader() }
    );
  }

  async removeFromCart(cart_id, product_id) {
    return await axios.delete(
      API_URL + "delete",
      { data: { cart_id:Number(cart_id), product_id: Number(product_id) } },
      { headers: authHeader() }
    );
  }
}

export default new CartService();
