const router = require('express').Router();
const pool = require("../db");

router.route("/create").post(async (req, res, next) => {
  const { cartId, userId, amount, itemTotal } = req.body;
  try {
    // create an order
    const order = await pool.query(
      "INSERT INTO orders(user_id, status, amount, total) VALUES($1, 'complete', $2, $3) returning *",
      [userId, amount, itemTotal]
    );

    // get order id of the newly created order data
    const order_id = order.rows[0].order_id;

    // copy cart items in the current cart into order items 
    try {
      const query = await pool.query(
        `
      INSERT INTO order_item(order_id,product_id, quantity) 
      SELECT $1, product_id, quantity from cart_item where cart_id = $2
      returning *
      `,
        [order_id, cartId]
      );

      // delete all items from cart after checking out
      await pool.query("delete from cart_item where cart_id = $1", [cartId]);

      res.json(order.rows[0]);

    } catch (error) {
      res.status(500).send(error)
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/").get(async (req, res, next) => {
  const { page, userId } = req.query;
  const limit = 5;
  const offset = (page - 1) * limit;
  try {
    const rows = await pool.query(
      "SELECT * from orders WHERE orders.user_id = $1",
      [userId]
    );
    const orders = await pool.query(
      `SELECT order_id, user_id, status, date::date, amount, total 
      from orders WHERE orders.user_id = $1 order by order_id desc limit $2 offset $3`,
      [userId, limit, offset]
    );
    res.json({ items: orders.rows, total: rows.rowCount });
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
});

module.exports = router;
