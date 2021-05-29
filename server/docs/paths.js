const auth = require("./auth");
const users = require("./users");
const products = require("./products");
const orders = require("./orders");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...products,
    ...orders
  },
};
