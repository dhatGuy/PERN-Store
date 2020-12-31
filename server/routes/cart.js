const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(verifyToken, async (req, res) => {
    const userId = req.body.userId;
    const isCartExist = await pool.query(
      "SELECT * FROM cart where user_id = $1",
      [userId]
    );
    if (isCartExist.rowCount === 0) {
      try {
        const newCart = await pool.query(
          "INSERT INTO cart(user_id) values($1) returning *",
          [userId]
        );

        res.send(newCart.rows[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send(isCartExist.rows[0]);
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.body;
      const result = await pool.query(
        "update cart_item set cart_item.quantity = $1 where cart.id = cart_item.cart_id"
      );
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const item = await pool.query(
        "delete from cart_item where id = $1 returning *",
        [id]
      );
      res.status(500).json(item.rows[0]);
    } catch (error) {
      throw error;
    }
  });

router.route("/").get(async (req, res) => {
  try {
    const { user_id } = req.body;
    const cart = await pool.query(
      `SELECT users.user_id, products.*, cart_item.quantity from users 
      join cart on users.user_id = cart.user_id
      join cart_item on cart.id = cart_item.cart_id
      join products on products.product_id = cart_item.product_id
      where users.user_id = $1
      `,
      [user_id]
    );
    res.json(cart.rows);
  } catch (error) {
    res.status(401).send(error);
    throw error;
  }
});

router.route("/add").post(async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
  try {
    const cart = await pool.query(
      "INSERT INTO cart_item(cart_id, product_id, quantity) VALUES($1, $2, $3) returning *",
      [cart_id, product_id, quantity]
    );
    res.json(cart.rows);
  } catch (error) {
    res.status(401).send(error);
    throw error;
  }
});

module.exports = router;
