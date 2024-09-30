import { db } from "~/database";

export class SharedCartService {
  async emptyCart(cartId: number) {
    await db.deleteFrom("cart_item").where("cart_id", "=", cartId).execute();
  }
}
