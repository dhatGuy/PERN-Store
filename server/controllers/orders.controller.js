const pool = require("../config");
const orderService = require("../services/order.service");
const cartService = require("../services/cart.service");

const createOrder = async (req, res, next) => {
  const { amount, itemTotal, stripePaymentId } = req.body;
  const userId = req.user.id;
  const cartId = req.user.cart_id;
  try {
    const newOrder = await orderService.createOrder({
      cartId,
      amount,
      itemTotal,
      userId,
      stripePaymentId,
    });

    // delete all items from cart_items table for the user order has been processed
    await cartService.emptyCart(cartId);

    res.json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllOrders = async (req, res, next) => {
  const { page = 1 } = req.query;
  const userId = req.user.id;
  try {
    const orders = await orderService.getAllOrders(userId, page);
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrder = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const order = await orderService.getOrderById({ id, userId });
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
};
