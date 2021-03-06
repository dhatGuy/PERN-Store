const pool = require("../config");

const getReviewsDb = async ({ productId, userId }) => {
  try {
    // check if current logged user review exist for the product
    const reviewExist = await pool.query(
      "SELECT EXISTS (SELECT * FROM reviews where product_id = $1 and user_id = $2)",
      [productId, userId]
    );

    // get reviews associated with the product
    const reviews = await pool.query(
      `SELECT users.fullname as name, reviews.* FROM reviews
        join users 
        on users.user_id = reviews.user_id
        WHERE product_id = $1`,
      [productId]
    );
    return {
      reviewExist: reviewExist.rows[0].exists,
      reviews: reviews.rows,
    };
  } catch (error) {
    return error;
  }
};

const createReviewDb = async ({ productId, content, rating, userId }) => {
  try {
    const { rows: review } = await pool.query(
      `INSERT INTO reviews(user_id, product_id, content, rating) 
       VALUES($1, $2, $3, $4) returning *
      `,
      [userId, productId, content, rating]
    );
    return review[0];
  } catch (error) {
    return error;
  }
};

const updateReviewDb = async ({ content, rating, id }) => {
  try {
    const { rows: review } = await pool.query(
      `UPDATE reviews set content = $1, rating = $2 where id = $3 returning *
      `,
      [content, rating, id]
    );
    return review[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  createReviewDb,
  updateReviewDb,
  getReviewsDb,
};
