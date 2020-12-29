const express = require("express");
const router = express.Router();
const pool = require("../db");

router
.route("/")
  .post(async (req, res) => {
    try {
      const { cart_id, product_id, quantity } = req.body;
      const item = await pool.query('select * from cart_item where product_id = $1', [product_id])
      if(item.rows.length > 0){
        const update = await pool.query("update cart_item set quantity = quantity + $1 where product_id = $2 returning *",[quantity, product_id])
        res.json(update.rows[0])
      } else{
        const addItem = await pool.query(
          "insert into cart_item(cart_id, product_id,quantity) values($1, $2, $3) returning *",
          [cart_id, product_id, quantity]
        );
          res.json(addItem.rows[0])
      }
      res.send(item.rows);
    } catch (error) {
      res.send(error);
      throw new Error(error);
    }
  })
  .put(async (req, res) => {
    try {
      const {id} = req.body
      const result = await pool.query("update cart_item set cart_item.quantity = $1 from cart where id = $2")
    } catch (error) {
      
    }
  })
  .delete(async (req, res) => {
    try {
      const {id} = req.params
      const item = await pool.query("delete from cart_item where id = $1 returning *", [id])
      res.status(500).json(item.rows[0])
    } catch (error) {
      throw error
    }
  });
  
  router.route("/:id").get(async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await pool.query(
        `SELECT users.user_id, cart.*, cart_item.quantity, products.* FROM users join cart on cart.user_id = users.user_id
          join cart_item on cart.id = cart_item.cart_id JOIN products ON products.product_id = cart_item.product_id
          where users.user_id = $1`,
        [id]
      );
      res.json(cart.rows);
    } catch (error) {
      res.status(401).send(error);
      throw error;
    }
  });

module.exports = router;
