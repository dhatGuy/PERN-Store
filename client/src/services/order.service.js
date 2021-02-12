import API from "api/axios.config";
import authService from "./auth.service";

const userId = authService.getCurrentUser()?.user_id;

class OrderService {
  createOrder(cartId, amount, itemTotal) {
    return API.post("/orders/create", { cartId, userId, amount, itemTotal });
  }
  getAllOrders(page) {
    return API.get(`/orders/?userId=${userId}&page=${page}`, { userId });
  }
  getOrder(id) {
    return API.get(`/orders/${id}`);
  }
}

export default new OrderService();
