const {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
} = require("../db/orders.db");

class OrderService {
  createOrder = async (data) => {
    try {
      return await createOrderDb(data);
    } catch (error) {
      throw error;
    }
  };

  getAllOrders = async (userId, page) => {
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
      return await getAllOrdersDb({userId, limit, offset});
    } catch (error) {
      throw error;
    }
  };

  getOrderById = async (data) => {
    try {
      return await getOrderDb(data);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new OrderService();
