const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getCart,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = require("../controllers/cart.controller");

// get cart items
router.route("/").get(verifyToken, getCart);

// add item to cart
router.route("/add").post(verifyToken, addItem);

// delete item from cart
router.route("/delete").delete(verifyToken, deleteItem);

// increment item quantity
router.route("/increment").put(verifyToken, increaseItemQuantity);

// decrement item quantity
router.route("/decrement").put(verifyToken, decreaseItemQuantity);

module.exports = router;
