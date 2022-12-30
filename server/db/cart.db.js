const pool = require("../config");

const createCartDb = async (userId) => {
  const { rows: cart } = await pool.query(
    "INSERT INTO cart(user_id) values($1) returning cart.id",
    [userId]
  );

  return cart[0];
};

const getCartDb = async (userId) => {
  // get cart items
  const cart = await pool.query(
    `SELECT products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from users
      join cart on users.user_id = cart.user_id
      join cart_item on cart.id = cart_item.cart_id
      join products on products.product_id = cart_item.product_id
      where users.user_id = $1
      `,
    [userId]
  );

  return cart.rows;
};

// add item to cart
const addItemDb = async ({ cart_id, product_id, quantity }) => {
  await pool.query(
    `INSERT INTO cart_item(cart_id, product_id, quantity) 
         VALUES($1, $2, $3) ON CONFLICT (cart_id, product_id) 
        DO UPDATE set quantity = cart_item.quantity + 1 returning *`,
    [cart_id, product_id, quantity]
  );

  const results = await pool.query(
    "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
    [cart_id]
  );

  return results.rows;
};

// delete item from cart
const deleteItemDb = async ({ cart_id, product_id }) => {
  const result = await pool.query(
    "delete from cart_item where cart_id = $1 AND product_id = $2 returning *",
    [cart_id, product_id]
  );
  return result.rows[0];
};

// increment item quantity by 1
const increaseItemQuantityDb = async ({ cart_id, product_id }) => {
  await pool.query(
    "update cart_item set quantity = quantity + 1 where cart_item.cart_id = $1 and cart_item.product_id = $2",
    [cart_id, product_id]
  );

  const results = await pool.query(
    `Select products.*, cart_item.quantity, 
       round((products.price * cart_item.quantity)::numeric, 2) as subtotal
       from cart_item join products 
       on cart_item.product_id = products.product_id 
       where cart_item.cart_id = $1
      `,
    [cart_id]
  );
  return results.rows;
};

// decrement item quantity by 1
const decreaseItemQuantityDb = async ({ cart_id, product_id }) => {
  await pool.query(
    "update cart_item set quantity = quantity - 1 where cart_item.cart_id = $1 AND cart_item.product_id = $2 returning *",
    [cart_id, product_id]
  );

  const results = await pool.query(
    "Select products.*, cart_item.quantity, round((products.price * cart_item.quantity)::numeric, 2) as subtotal from cart_item join products on cart_item.product_id = products.product_id where cart_item.cart_id = $1",
    [cart_id]
  );
  return results.rows;
};

const emptyCartDb = async (cartId) => {
  return await pool.query("delete from cart_item where cart_id = $1", [cartId]);
};

module.exports = {
  createCartDb,
  getCartDb,
  addItemDb,
  increaseItemQuantityDb,
  decreaseItemQuantityDb,
  deleteItemDb,
  emptyCartDb,
};
