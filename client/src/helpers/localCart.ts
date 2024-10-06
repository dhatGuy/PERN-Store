import { z } from "zod";
import { CartItem, cartItemSchema } from "~/enitities/cart";

class LocalCart {
  isExist = (id: string | number) => !!this.getItem(id);

  getItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem("__cart") || "[]");
      return z.array(cartItemSchema).parse(items);
    } catch {
      return [];
    }
  };

  getItem = (id: string | number) => this.getItems().find((item) => item.id === id);

  saveItems = (data: CartItem[]) => localStorage.setItem("__cart", JSON.stringify(data));

  removeItem = (id: string | number) =>
    this.saveItems(this.getItems().filter((product) => product.id !== id));

  incrementQuantity = (id: string | number) =>
    this.saveItems(
      this.getItems().map((prod) => {
        if (id === prod.product_id) {
          prod.quantity += 1;
          prod.subtotal = prod.price * prod.quantity;
        }
        return prod;
      })
    );

  decrementQuantity = (id: string | number) =>
    this.saveItems(
      this.getItems().map((prod) => {
        if (id === prod.product_id) {
          if (prod.quantity === 0) {
            prod.quantity = 0;
          } else {
            prod.quantity -= 1;
          }
          prod.subtotal = prod.price * prod.quantity;
        }
        return prod;
      })
    );

  updateItem = (product: Partial<CartItem>, quantity: number = 1) => {
    if (this.isExist(product.id!)) {
      this.saveItems(
        this.getItems().map((item) => {
          if (product.id === item.id) {
            item.quantity += quantity;
            item.subtotal = item.price * item.quantity;
          }
          return item;
        })
      );
    } else {
      product.quantity = 1;
      product.subtotal = product.price;
      this.saveItems([...this.getItems(), product as CartItem]);
    }
  };
  clearCart = () => localStorage.removeItem("__cart");
}

export default new LocalCart();
