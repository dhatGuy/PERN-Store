import { sql } from "kysely";
import { db } from "~/database";
import { SharedCartService } from "~/services/cart.service";
import { CartUpdateSchema } from "./cart.schema";

export class CartService {
  private sharedCartService: SharedCartService;

  constructor() {
    this.sharedCartService = new SharedCartService();
  }

  createCart = async (userId: string) => {
    const cart = db
      .insertInto("cart")
      .values({ user_id: userId })
      .returningAll()
      .executeTakeFirst();
    return cart;
  };
  getCart = async (userId: string) => {
    const cart = await db
      .selectFrom("cart")
      .innerJoin("user", "cart.user_id", "user.id")
      .innerJoin("cart_item", "cart.id", "cart_item.cart_id")
      .innerJoin("product", "cart_item.product_id", "product.id")
      .selectAll("product")
      .select([
        "cart_item.quantity",
        sql<number>`round(CAST(product.price * cart_item.quantity AS numeric), 2)`.as(
          "subtotal"
        ),
      ])
      .where("user_id", "=", userId)
      .orderBy("cart_item.created_at", "desc")
      .execute();

    return cart;
  };

  updateCart = async (data: CartUpdateSchema) => {
    if (data.quantity === 0) {
      await db
        .deleteFrom("cart_item")
        .where("cart_id", "=", data.cartId)
        .where("product_id", "=", data.productId)
        .execute();
    } else {
      await db
        .insertInto("cart_item")
        .values({
          cart_id: data.cartId,
          product_id: data.productId,
          quantity: data.quantity ?? 1,
        })
        .onConflict((oc) =>
          oc.columns(["cart_id", "product_id"]).doUpdateSet({
            quantity: sql<number>`${data.quantity ?? 1}`,
          })
        )
        .execute();
    }

    const cartItems = await db
      .selectFrom("cart_item")
      .fullJoin("product", "product.id", "cart_item.product_id")
      .selectAll("product")
      .select([
        "cart_item.quantity",
        sql<number>`round(CAST(product.price * cart_item.quantity AS numeric), 2)`.as(
          "subtotal"
        ),
      ])
      .where("cart_item.cart_id", "=", data.cartId)
      .execute();

    return cartItems;
  };

  removeItem = async (data: { cartId: number; productId: number }) => {
    return await db
      .deleteFrom("cart_item")
      .where("cart_id", "=", data.cartId)
      .where("product_id", "=", data.productId)
      .executeTakeFirst();
  };
  emptyCart = async (cartId: number) => {
    this.sharedCartService.emptyCart(cartId);
  };
}
