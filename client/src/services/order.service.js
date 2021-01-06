import axios from "axios";
import authService from "./auth.service";
import authHeader from "./authHeader";

const API_URL = "http://localhost:9000/api/orders/";

const userId = authService.getCurrentUser()?.user_id;

class OrderService {
  createOrder(cartId, amount, itemTotal) {
    return axios.post(
      API_URL + "create",
      { cartId, userId, amount, itemTotal },
      { headers: authHeader() }
    );
  }
  getAllOrders(page) {
    return axios.get(
      API_URL + `?userId=${userId}&page=${page}`, 
      { userId }, 
      { headers: authHeader() }
      );
  }
  getOrder(id){
    return axios.get(API_URL + `${id}`, {headers: authHeader()})
  }
}

export default new OrderService();
