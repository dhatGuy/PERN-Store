const pool = require("../config");

const getAllProductsDb = async ({ limit, offset }) => {
  const [productsQueryResult, totalProductsQueryResult] = await Promise.all([
    pool.query(
      `select products.*, trunc(avg(reviews.rating)) as avg_rating, count(reviews.*)::int from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        group by products.product_id limit $1 offset $2 `,
      [limit, offset]
    ),
    pool.query(`SELECT COUNT(*) FROM products`),
  ]);

  const { rows: products } = productsQueryResult;

  const totalProducts = totalProductsQueryResult.rows[0].count;

  return {
    products,
    totalProducts,
  };
};

const getAllProductsAdminDb = async ({ limit, offset }) => {
  const [productsQueryResult, totalProductsQueryResult] = await Promise.all([
    pool.query(
      `select products.*, coalesce(trunc(avg(reviews.rating), 1), 0) as "avgRating", 
    count(order_item.*)::int as "totalOrders",
    count(reviews.*)::int as "totalReviews" from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        LEFT JOIN order_item
        ON products.product_id = order_item.product_id
        group by products.product_id limit $1 offset $2 `,
      [limit, offset]
    ),
    pool.query(`SELECT COUNT(*) FROM products`),
  ]);

  const { rows: products } = productsQueryResult;

  const totalProducts = totalProductsQueryResult.rows[0].count;

  return {
    products,
    totalProducts,
  };
};

const createProductDb = async ({ name, price, description, image_url }) => {
  const { rows: product } = await pool.query(
    "INSERT INTO products(name, price, description, image_url) VALUES($1, $2, $3, $4) returning *",
    [name, price, description, image_url]
  );
  return product[0];
};

const getProductDb = async ({ id }) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.product_id = $1
        group by products.product_id`,
    [id]
  );
  return product[0];
};

const getProductBySlugDb = async ({ slug }) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.slug = $1
        group by products.product_id`,
    [slug]
  );
  return product[0];
};

const getProductByNameDb = async ({ name }) => {
  const { rows: product } = await pool.query(
    `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
        LEFT JOIN reviews
        ON products.product_id = reviews.product_id
        where products.name = $1
        group by products.product_id`,
    [name]
  );
  return product[0];
};

const updateProductDb = async ({ name, price, description, image_url, id }) => {
  const { rows: product } = await pool.query(
    "UPDATE products set name = $1, price = $2, description = $3 image_url = $4 where product_id = $5 returning *",
    [name, price, description, image_url, id]
  );
  return product[0];
};

const deleteProductDb = async ({ id }) => {
  const { rows } = await pool.query(
    "DELETE FROM products where product_id = $1 returning *",
    [id]
  );
  return rows[0];
};

module.exports = {
  getProductDb,
  getAllProductsAdminDb,
  getProductByNameDb,
  createProductDb,
  updateProductDb,
  deleteProductDb,
  getAllProductsDb,
  getProductBySlugDb,
};
