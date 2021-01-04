const express = require("express");
const router = express.Router();
const pool = require("../db");

router.route("/create").post(async (req, res, next) => {
  const { cartId, userId, amount, itemTotal } = req.body;
  try {
    const order = await pool.query(
      "INSERT INTO orders(user_id, status, amount, total) VALUES($1, 'complete', $2, $3) returning *",
      [userId, amount, itemTotal]
    );

    const order_id = order.rows[0].order_id;
    const cartItem = await pool.query(
      "SELECT product_id, quantity from cart_item where cart_id = $1",
      [cartId]
    );

    cartItem.rows.forEach(
      async (item) =>
        await pool.query(
          "INSERT INTO order_item(order_id,product_id, quantity) VALUES($1, $2, $3)",
          [order_id, item.product_id, item.quantity]
        )
    );

    await pool.query("delete from cart_item where cart_id = $1", [cartId]);

    res.json(order.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.route("/").get(async (req, res, next) => {
  try {
    const orders = await pool.query(
      "SELECT * from orders WHERE orders.user_id = $1",
      [req.query.userId]
    );
    res.json(orders.rows);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").get(async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await pool.query(
      `SELECT products.*, order_item.quantity 
      from orders 
      join order_item
      on order_item.order_id = orders.order_id
      join products 
      on products.product_id = order_item.product_id 
      where orders.order_id = $1`,
      [id]
    );
    res.json(order.rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
