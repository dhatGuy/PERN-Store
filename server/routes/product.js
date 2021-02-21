const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .get(async (req, res) => {
    const { page } = req.query;
    const limit = 12;
    try {
      const offset = (page - 1) * limit;
      const results = await pool.query(
        `select products.*, trunc(avg(reviews.rating)) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        group by products.product_id limit $1 offset $2 `,
        [limit, offset]
      );
      results.rows = [...results.rows].sort(()=> Math.random() - 0.5)
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(verifyToken, verifyAdmin, async (req, res) => {
    const { name, price, description } = req.body;

    try {
      const results = await pool.query(
        "INSERT INTO products(name, price, description) VALUES($1, $2, $3) returning *",
        [name, price, description]
      );
      res.status(200).json({
        status: "success",
        data: results.rows[0],
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const results = await pool.query(
        `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.product_id = $1
        group by products.product_id`,
        [id]
      );
      res.status(200).json({
        product: results.rows[0]
      });
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put(verifyToken, verifyAdmin, async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;
    try {
      const results = await pool.query(
        "UPDATE products set name = $1, price = $2, description = $3 where product_id = $4 returning *",
        [name, price, description, id]
      );
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const results = await pool.query(
        "DELETE FROM products where product_id = $1 returning *",
        [id]
      );
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
