const getOrder = require("./getOrder");
const getOrders = require("./getOrders");
const createOrder = require("./createOrder");

module.exports = {
  "/orders": {
    ...getOrders,
    ...createOrder,
  },
  "/orders/{id}": {
    ...getOrder,
  },
};
