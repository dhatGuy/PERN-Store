import { sql } from "kysely";
import { QueryResult } from "pg";
import { db } from "~/database";
import { query } from "~/database/database";

class ProductStore {
  async index({ limit = 12, offset = 0 }: { limit?: number; offset?: number }) {
    try {
      const products = await db
        .selectFrom("product")
        .leftJoin("review", "product.id", "review.product_id")
        .selectAll("product")
        .select((_eb) => [
          sql<number>`TRUNC(AVG(review.rating))`.as("avgRating"),
          sql<number>`COUNT(DISTINCT review.*)::INT`.as("reviewCount"),
        ])
        .groupBy("product.id")
        .limit(limit)
        .offset(offset)
        .execute();

      return {
        result: products,
        total: products.length,
      };
    } catch (error) {
      throw error;
    }
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
