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
    const cart = db
      .selectFrom("cart")
      .fullJoin("user", "cart.user_id", "user.id")
      .fullJoin("cart_item", "cart.id", "cart_item.cart_id")
      .fullJoin("product", "cart_item.product_id", "product.id")
      .selectAll("product")
      .select([
        "cart_item.quantity",
        sql<number>`round(products.price * cart_item.quantity)::numeric, 2`.as(
          "subtotal"
        ),
      ])
      .where("user_id", "=", userId)
      .executeTakeFirstOrThrow();

    return cart;
  };

  updateCart = async (data: CartUpdateSchema) => {
    if (!data.cartId) {
      const newCart = await this.createCart(data.userId);
      if (!newCart) throw new Error("Cart not created");

      data.cartId = newCart.id;
    }

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
            quantity: sql<number>`cart_item.quantity + ${data.quantity ?? 1}`,
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
        sql<number>`round(products.price * cart_item.quantity)::numeric, 2`.as(
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
