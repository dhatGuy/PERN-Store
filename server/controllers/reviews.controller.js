const pool = require("../config");

const getReview = async (req, res, next) => {
  const { product_id, user_id } = req.query;
  try {
    // check if current logged user review exist for the product
    const reviewExist = await pool.query(
      "SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)",
      [product_id, user_id]
    );

    // get reviews associated with the product
    const reviews = await pool.query(
      `SELECT users.fullname as name, reviews.* FROM reviews
        join users 
        on users.user_id = reviews.user_id
        WHERE product_id = $1`,
      [product_id]
    );
    res.status(200).json({
      reviewExist: reviewExist.rows[0].exists,
      reviews: reviews.rows,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

  const createReview = async (req, res) => {
    const {product_id, content, rating } = req.body;
    const user_id = req.user.id;

    try {
      const result = await pool.query(
        `INSERT INTO reviews(user_id, product_id, content, rating) 
       VALUES($1, $2, $3, $4) returning *
      `,
        [user_id, product_id, content, rating]
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json(error.detail);
    }
  }

  const updateReview = async (req, res) => {
    const { content, rating, id } = req.body;

    try {
      const result = await pool.query(
        `UPDATE reviews set content = $1, rating = $2 where id = $3 returning *
      `,
        [content, rating, id]
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  module.exports = {
    createReview,
    updateReview,
    getReview
  }
