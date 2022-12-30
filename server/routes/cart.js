const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getCart,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = require("../controllers/cart.controller");

router.use(verifyToken);
// get cart items
router.route("/").get(getCart);

// add item to cart
router.route("/add").post(addItem);

// delete item from cart
router.route("/delete").delete(deleteItem);

// increment item quantity
router.route("/increment").put(increaseItemQuantity);

// decrement item quantity
router.route("/decrement").put(decreaseItemQuantity);

module.exports = router;
