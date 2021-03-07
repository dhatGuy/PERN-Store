const pool = require("../config");

const getAllProductsDb = async ({ limit, offset }) => {
  try {
    const { rows } = await pool.query(
      `select products.*, trunc(avg(reviews.rating)) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        group by products.product_id limit $1 offset $2 `,
      [limit, offset]
    );
    const products = [...rows].sort(() => Math.random() - 0.5);
    return products;
  } catch (error) {
    return error;
  }
};

const createProductDb = async ({ name, price, description }) => {
  try {
    const {
      rows: product,
    } = await pool.query(
      "INSERT INTO products(name, price, description) VALUES($1, $2, $3) returning *",
      [name, price, description]
    );
    return product[0];
  } catch (error) {
    return error;
  }
};

const getProductDb = async ({ id }) => {
  try {
    const { rows: product } = await pool.query(
      `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.product_id = $1
        group by products.product_id`,
      [id]
    );
    return product[0];
  } catch (error) {
    return error;
  }
};

const updateProductDb = async ({ name, price, description, id }) => {
  try {
    const {
      rows: product,
    } = await pool.query(
      "UPDATE products set name = $1, price = $2, description = $3 where product_id = $4 returning *",
      [name, price, description, id]
    );
    return product[0];
  } catch (error) {
    return error;
  }
};

const deleteProductDb = async ({id}) => {
  try {
    const {
      rows,
    } = await pool.query(
      "DELETE FROM products where product_id = $1 returning *",
      [id]
    );
    return rows[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getProductDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
  getAllProductsDb,
};
