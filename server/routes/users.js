const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken)
router.use(verifyAdmin)
router
  .route("/")
  .get(async (req, res) => {
    try {
      const results = await pool.query("select * from users");
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(async (req, res) => {
    const { username, password, email, fullname } = req.body;

    try {
      const results = await pool.query(
        "INSERT INTO users(username, password, email, fullname) VALUES($1, $2, $3, $4) returning *",
        [username, password, email, fullname]
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
        "select * from users where user_id = $1",
        [id]
      );
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put(async (req, res) => {
    const { username, password, email, fullname } = req.body;
    const { id } = req.params;
    try {
      const results = await pool.query(
        "UPDATE users set username = $1, password = $2, email = $3, fullname = $4 where user_id = $5 returning *",
        [username, password, email, fullname, id]
      );
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const results = await pool.query(
        "DELETE FROM users where user_id = $1 returning *",
        [id]
      );
      res.status(200).json(results.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
