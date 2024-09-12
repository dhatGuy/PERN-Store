import { query } from "database";
import { QueryResult } from "pg";

class ProductStore {
  async getAllProducts({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ products: any[] }> {
    const productsQueryResult: QueryResult = await query(
      `SELECT 
        products.*, 
        TRUNC(AVG(reviews.rating)) AS avgRating, 
        COUNT(DISTINCT reviews.*)::INT AS reviewCount,
        COUNT(*) OVER() AS totalProducts
      FROM products
      LEFT JOIN reviews ON products.productId = reviews.productId
      GROUP BY products.product_id
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const { rows: products } = productsQueryResult;
    // const totalProducts = totalProductsQueryResult.rows[0].count;

    return {
      products,
      // totalProducts,
    };
  }

  async getAllProductsAdmin({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ products: any[]; totalProducts: string }> {
    const [productsQueryResult, totalProductsQueryResult]: [
      QueryResult,
      QueryResult,
    ] = await Promise.all([
      query(
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
      query(`SELECT COUNT(*) FROM products`),
    ]);

    const { rows: products } = productsQueryResult;
    const totalProducts = totalProductsQueryResult.rows[0].count;

    return {
      products,
      totalProducts,
    };
  }

  async createProduct({
    name,
    price,
    description,
    image_url,
  }: {
    name: string;
    price: number;
    description: string;
    image_url: string;
  }): Promise<any> {
    const { rows: product } = await query(
      "INSERT INTO products(name, price, description, image_url) VALUES($1, $2, $3, $4) returning *",
      [name, price, description, image_url]
    );
    return product[0];
  }

  async getProduct({ id }: { id: number }): Promise<any> {
    const { rows: product } = await query(
      `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
          LEFT JOIN reviews
          ON products.product_id = reviews.product_id
          where products.product_id = $1
          group by products.product_id`,
      [id]
    );
    return product[0];
  }

  async getProductBySlug({ slug }: { slug: string }): Promise<any> {
    const { rows: product } = await query(
      `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
          LEFT JOIN reviews
          ON products.product_id = reviews.product_id
          where products.slug = $1
          group by products.product_id`,
      [slug]
    );
    return product[0];
  }

  async getProductByName({ name }: { name: string }): Promise<any> {
    const { rows: product } = await query(
      `select products.*, trunc(avg(reviews.rating),1) as avg_rating, count(reviews.*) from products
          LEFT JOIN reviews
          ON products.product_id = reviews.product_id
          where products.name = $1
          group by products.product_id`,
      [name]
    );
    return product[0];
  }

  async updateProduct({
    name,
    price,
    description,
    image_url,
    id,
  }: {
    name: string;
    price: number;
    description: string;
    image_url: string;
    id: number;
  }): Promise<any> {
    const { rows: product } = await query(
      "UPDATE products set name = $1, price = $2, description = $3, image_url = $4 where product_id = $5 returning *",
      [name, price, description, image_url, id]
    );
    return product[0];
  }

  async deleteProduct({ id }: { id: number }): Promise<any> {
    const { rows } = await query(
      "DELETE FROM products where product_id = $1 returning *",
      [id]
    );
    return rows[0];
  }
}

export default ProductStore;
