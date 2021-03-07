const pool = require("../config/index");

const createOrderDb = async ({ cartId, amount, itemTotal, userId }) => {
  try {
    // create an order
    const {
      rows: order,
    } = await pool.query(
      "INSERT INTO orders(user_id, status, amount, total) VALUES($1, 'complete', $2, $3) returning *",
      [userId, amount, itemTotal]
    );

    // copy cart items from the current cart_item table into order_item table
    await pool.query(
      `
      INSERT INTO order_item(order_id,product_id, quantity) 
      SELECT $1, product_id, quantity from cart_item where cart_id = $2
      returning *
      `,
      [order[0].order_id, cartId]
    );
    return order[0];
  } catch (error) {
    throw error;
  }
};

const getAllOrdersDb = async ({ userId, limit, offset }) => {
  try {
    const {rowCount} = await pool.query(
      "SELECT * from orders WHERE orders.user_id = $1",
      [userId]
    );
    const orders = await pool.query(
      `SELECT order_id, user_id, status, date::date, amount, total 
      from orders WHERE orders.user_id = $1 order by order_id desc limit $2 offset $3`,
      [userId, limit, offset]
    );
    return { items: orders.rows, total: rowCount };
  } catch (error) {
    throw error;
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
    throw error;
  }
};

module.exports = {
  createOrderDb,
  getAllOrdersDb,
  getOrderDb,
};
