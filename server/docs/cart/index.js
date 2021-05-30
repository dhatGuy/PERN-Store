const getCart = require("./getCart");
const addItem = require("./addItem");
const decrease = require("./decrease");
const increase = require("./increase");
const removeItem = require("./removeItem");

module.exports = {
  "/cart": {
    ...getCart,
  },
  "/cart/add": {
    ...addItem,
  },
  "cart/increment": {
    ...increase,
  },
  "cart/decrement": {
    ...decrease,
  },
  "/cart/delete": {
    ...removeItem,
  },
};
