import { sql } from "kysely";
import { db } from "~/database";
import { slugify } from "~/utils/index";
import { ProductCreateInput, ProductUpdateInput } from "./product.schema";

class ProductService {
  async index({ limit = 12, page = 1 }: { limit?: number; page?: number }) {
    const offset = (page - 1) * limit;

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

      const totalRecords = await db
        .selectFrom("product")
        .select(sql<number>`COUNT(*)::INT`.as("count"))
        .executeTakeFirst()
        .then((result) => result?.count ?? 0);

      const totalPages = Math.ceil(totalRecords / limit);

      return {
        products: products,
        total: products.length,
        totalRecords,
        currentPage: page,
        pageSize: limit,
        totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  // async getAllProductsAdmin({
  //   limit,
  //   offset,
  // }: {
  //   limit: number;
  //   offset: number;
  // }): Promise<{ products: any[]; totalProducts: string }> {
  //   const [productsQueryResult, totalProductsQueryResult]: [
  //     QueryResult,
  //     QueryResult,
  //   ] = await Promise.all([
  //     query(
  //       `select products.*, coalesce(trunc(avg(reviews.rating), 1), 0) as "avgRating",
  //     count(order_item.*)::int as "totalOrders",
  //     count(reviews.*)::int as "totalReviews" from products
  //         LEFT JOIN reviews
  //         ON products.product_id = reviews.product_id
  //         LEFT JOIN order_item
  //         ON products.product_id = order_item.product_id
  //         group by products.product_id limit $1 offset $2 `,
  //       [limit, offset]
  //     ),
  //     query(`SELECT COUNT(*) FROM products`),
  //   ]);

  //   const { rows: products } = productsQueryResult;
  //   const totalProducts = totalProductsQueryResult.rows[0].count;

  //   return {
  //     products,
  //     totalProducts,
  //   };
  // }

  async createProduct(data: ProductCreateInput) {
    const slug = slugify(data.name);
    const product = await db
      .insertInto("product")
      .values({
        ...data,
        slug,
      })
      .returningAll()
      .executeTakeFirst();

    return product;
  }

  async getProduct({ id }: { id: number }) {
    const product = db
      .selectFrom("product")
      .leftJoin("review", "product.id", "review.product_id")
      .selectAll("product")
      .select((_eb) => [
        sql<number>`TRUNC(AVG(review.rating), 1)`.as("avgRating"),
        sql<number>`COUNT(DISTINCT review.*)::INT`.as("reviewCount"),
      ])
      .where("product.id", "=", id)
      .groupBy("product.id")
      .executeTakeFirst();

    return product;
  }

  async getProductBySlug({ slug }: { slug: string }): Promise<any> {
    const product = db
      .selectFrom("product")
      .leftJoin("review", "product.id", "review.product_id")
      .selectAll("product")
      .select((_eb) => [
        sql<number>`TRUNC(AVG(review.rating), 1)`.as("avgRating"),
        sql<number>`COUNT(DISTINCT review.*)::INT`.as("reviewCount"),
      ])
      .where("product.slug", "=", slug)
      .groupBy("product.id")
      .executeTakeFirst();

    return product;
  }

  async getProductByName({ name }: { name: string }): Promise<any> {
    const product = db
      .selectFrom("product")
      .leftJoin("review", "product.id", "review.product_id")
      .selectAll("product")
      .select((_eb) => [
        sql<number>`TRUNC(AVG(review.rating), 1)`.as("avgRating"),
        sql<number>`COUNT(DISTINCT review.*)::INT`.as("reviewCount"),
      ])
      .where("product.name", "=", name)
      .groupBy("product.id")
      .executeTakeFirst();

    return product;
  }

  async updateProduct(
    id: number,
    { name, price, description, image_url }: ProductUpdateInput
  ) {
    // fetch existing product
    const product = await this.getProduct({ id });

    if (!product) {
      throw new Error("Product not found");
    }

    const slug = product.name === name || !name ? product.slug : slugify(name);
    const productUpdate = await db
      .updateTable("product")
      .set({
        name: name ?? product.name,
        price: price ?? product.price,
        description: description ?? product.description,
        image_url: image_url ?? product.image_url,
        slug,
      })
      .where("product.id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return productUpdate;
  }

  async deleteProduct({ id }: { id: number }) {
    await db.deleteFrom("product").where("product.id", "=", id).execute();
  }
}

export default ProductService;
