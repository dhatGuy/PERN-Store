import API from "api/axios.config";
import authService from "./auth.service";
import authHeader from "./authHeader";

const userId = authService.getCurrentUser()?.user_id;

class OrderService {
  createOrder(cartId, amount, itemTotal) {
    return API.post(
      "/orders/create",
      { cartId, userId, amount, itemTotal },
      { headers: authHeader() }
    );
  }
  getAllOrders(page) {
    return API.get(
      `/orders/?userId=${userId}&page=${page}`,
      { userId },
      { headers: authHeader() }
    );
  }
  getOrder(id) {
    return API.get(`/orders/${id}`, { headers: authHeader() });
  }
}

export default new OrderService();
