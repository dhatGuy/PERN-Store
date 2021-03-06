const pool = require("../db");

const createOrderDb = async ({ cartId, amount, itemTotal, userId }) => {
  try {
    // create an order
    const order = await pool.query(
      "INSERT INTO orders(user_id, status, amount, total) VALUES($1, 'complete', $2, $3) returning *",
      [userId, amount, itemTotal]
    );

    // get order id of the newly created order
    const order_id = order.rows[0].order_id;

    // copy cart items from the current cart_item table into order_item table
    try {
      await pool.query(
        `
      INSERT INTO order_item(order_id,product_id, quantity) 
      SELECT $1, product_id, quantity from cart_item where cart_id = $2
      returning *
      `,
        [order_id, cartId]
      );

      // delete all items from cart_items table
      await pool.query("delete from cart_item where cart_id = $1", [cartId]);

      res.json(order.rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllOrdersDb = async ({userid, limit, offset}) => {
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
    return { items: orders.rows, total: rows.rowCount }
  } catch (error) {
    return error
  }
};

const getOrderDb = async ({ id, userId }) => {
  try {
    const { rows: order } = await pool.query(
      `SELECT products.*, order_item.quantity 
      from orders 
      join order_item
      on order_item.order_id = orders.order_id
      join products 
      on products.product_id = order_item.product_id 
      where orders.order_id = $1 AND orders.user_id = $2`,
      [id, userId]
    );
    return order;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
};
