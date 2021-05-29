const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const createProduct = require("./createProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");

module.exports = {
  "/products": {
    ...getProducts,
    ...createProduct,
  },
  "/products/{id}": {
    ...getProduct,
    ...updateProduct,
    ...deleteProduct,
  },
};
