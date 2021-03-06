import API from "api/axios.config";

class OrderService {
  createOrder(amount, itemTotal) {
    return API.post("/orders/create", { amount, itemTotal });
  }
  getAllOrders(page) {
    return API.get(`/orders/?page=${page}`);
  }
  getOrder(id) {
    return API.get(`/orders/${id}`);
  }
}

export default new OrderService();
