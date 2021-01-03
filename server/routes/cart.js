const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.route("/create").post(verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const isCartExist = await pool.query(
    "SELECT * FROM cart where user_id = $1",
    [userId]
  );
  if (isCartExist.rowCount === 0) {
    try {
      const newCart = await pool.query(
        "INSERT INTO cart(user_id) values($1) returning cart.id",
        [userId]
      );

      res.status(201).json({
        msg: "Cart created",
        data: newCart.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(201).json({
      msg: "Cart exist already",
      data: isCartExist.rows[0],
    });
  }
  
  router.route("/").post(async (req, res) => {
});

  try {
    const { userId } = req.body;
    const cartId = await pool.query("select id from cart where user_id = $1", [
      userId,
    ]);
    const cart = await pool.query(
      `SELECT products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from users 
      join cart on users.user_id = cart.user_id
      join cart_item on cart.id = cart_item.cart_id
      join products on products.product_id = cart_item.product_id
      where users.user_id = $1
      `,
      [userId]
    );
    res.json({ items: cart.rows, cartId: cartId.rows[0].id });
  } catch (error) {
    res.status(401).send(error);
    throw error;
  }
});

router.route("/add").post(verifyToken, async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;

  try {
    const isProductExist = await pool.query(
      "SELECT * FROM cart_item WHERE cart_id = $1 AND product_id = $2",
      [cart_id, product_id]
    );
    if (isProductExist.rowCount > 0) {
      await pool.query(
        "UPDATE cart_item set quantity = cart_item.quantity + 1 WHERE cart_id = $1 AND product_id = $2 returning *",
        [cart_id, product_id]
      );
      const product = await pool.query(
        "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
        [cart_id]
      );
      res.status(200).json({
        msg: "Product already in cart. Quantity increased",
        data: product.rows,
      });
    } else {
      await pool.query(
        "INSERT INTO cart_item(cart_id, product_id, quantity) VALUES($1, $2, $3) returning *",
        [cart_id, product_id, quantity]
      );
      const product = await pool.query(
        "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
        [cart_id]
      );
      console.log(product.rows);
      res.status(200).json({ data: product.rows });
    }
  } catch (error) {
    res.status(401).send(error);
    throw error;
  }
});

router.route("/delete").delete(async (req, res, next) => {
  const { cart_id, product_id } = req.body;
  try {
    const result = await pool.query(
      "delete from cart_item where cart_id = $1 AND product_id = $2 returning *",
      [cart_id, product_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.route("/increment").put(async (req, res, next) => {
  const { cart_id, product_id } = req.body;
  try {
    await pool.query(
      "update cart_item set quantity = quantity + 1 where cart_item.cart_id = $1 and cart_item.product_id = $2",
      [cart_id, product_id]
    );
    const product = await pool.query(
      "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
      [cart_id]
    );
    res.json(product.rows);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.route("/decrement").put(async (req, res, next) => {
  const { cart_id, product_id } = req.body;

  try {
    await pool.query(
      "update cart_item set quantity = quantity - 1 where cart_item.cart_id = $1 AND cart_item.product_id = $2 returning *",
      [cart_id, product_id]
    );
    const product = await pool.query(
      "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
      [cart_id]
    );
    res.json(product.rows);
  } catch (error) {
    console.log(error);
    res.status(404).json(error)
  }
});

module.exports = router;
