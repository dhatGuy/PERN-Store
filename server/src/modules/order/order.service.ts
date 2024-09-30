import { Updateable } from "kysely";
import { Order } from "kysely-codegen";
import { db } from "~/database";
import { SharedCartService } from "~/services/cart.service";
import { OrderCreateInput } from "./order.schema";

export class OrderService {
  private sharedCartService: SharedCartService;

  constructor() {
    this.sharedCartService = new SharedCartService();
  }
  createOrder = async (data: OrderCreateInput) => {
    const order = await db
      .insertInto("order")
      .values({
        amount: data.amount,
        status: "pending", // TODO: use enum
        user_id: data.userId,
        payment_method: data.paymentMethod,
        payment_reference: data.paymentReference,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // copy cart items from the current cart_item table into order_item table
    await db
      .insertInto("order_item")
      .columns(["order_id", "product_id", "quantity"])
      .expression((eb) =>
        eb
          .selectFrom("cart_item")
          .select((eb) => [
            eb.val(order.id).as("order_id"),
            "product_id",
            "quantity",
          ])
          .where("cart_id", "=", data.cartId)
      )
      .execute();

    return order;
  };

  updateOrder = async (id: number, cartId: number, data: Updateable<Order>) => {
    const order = await db
      .updateTable("order")
      .set(data)
      .where("order.id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // clear cart if status is complete
    if (order.status === "complete") {
      await this.sharedCartService.emptyCart(cartId);
    }

    return order;
  };

  getAllOrders = async ({
    userId,
    page,
    limit,
  }: {
    userId: string;
    page: number;
    limit: number;
  }) => {
    const offset = (page - 1) * limit;
    const orders = await db
      .selectFrom("order")
      .selectAll()
      .where("user_id", "=", userId)
      .limit(limit)
      .offset(offset)
      .execute();

    // TODO: add paginated metadata
    return {
      items: orders,
      total: orders.length,
    };
  };

  getOrderById = async (id: number) => {
    const order = await db
      .selectFrom("order")
      .selectAll()
      .where("order.id", "=", id)
      .executeTakeFirstOrThrow();
    return order;
  };
}
