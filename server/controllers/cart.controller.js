const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // get cart items
    const cart = await cartService.getCart(userId);
    res.json({ items: cart });
  } catch (error) {
    res.status(500).send(error);
  }
};

// add item to cart
const addItem = async (req, res) => {
  const cart_id = req.user.cart_id;
  try {
    const cart = await cartService.addItem({ ...req.body, cart_id });
    res.status(200).json({ data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// delete item from cart
const deleteItem = async (req, res, next) => {
  const { product_id } = req.body;
  const cart_id = req.user.cart_id;
  try {
    const data = await cartService.removeItem({ cart_id, product_id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// increment item quantity by 1
const increaseItemQuantity = async (req, res, next) => {
  const { product_id } = req.body;
  const cart_id = req.user.cart_id;

  try {
    const cart = await cartService.increaseQuantity({ cart_id, product_id });
    res.json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// decrement item quantity by 1
const decreaseItemQuantity = async (req, res, next) => {
  const { product_id } = req.body;
  const cart_id = req.user.cart_id;

  try {
    const cart = await cartService.decreaseQuantity({ cart_id, product_id });
    res.json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getCart,
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
};
