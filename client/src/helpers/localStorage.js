class LocalCart {
  isExist = (id) => !!this.getItem(id);

  getItems = () => JSON.parse(localStorage.getItem("__cart")) || [];

  getItem = (id) => this.getItems().find((product) => product.product_id === id);

  saveItems = (data) => localStorage.setItem("__cart", JSON.stringify(data));

  removeItem = (id) =>
    this.saveItems(this.getItems().filter((product) => product.product_id !== id));

  incrementQuantity = (id) =>
    this.saveItems(
      this.getItems().map((prod) => {
        if (id === prod.product_id) {
          prod.quantity += 1;
          prod.subtotal = prod.price * prod.quantity;
        }
        return prod;
      })
    );

  decrementQuantity = (id) =>
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

  addItem = (product, quantity) => {
    if (this.isExist(product.product_id)) {
      this.saveItems(
        this.getItems().map((prod) => {
          if (product.product_id === prod.product_id) {
            prod.quantity += quantity || 1;
          }
          return prod;
        })
      );
    } else {
      product.quantity = 1;
      product.subtotal = product.price;
      this.saveItems([...this.getItems(), product]);
    }
  };
  clearCart = () => localStorage.removeItem("__cart");
}

export default new LocalCart();
