import CartItem from "components/CartItem";
import { useCart } from "context/CartContext";
import React from "react";

const Cart = () => {
  const { cartData } = useCart();

  if (!cartData) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {cartData.items.map((item) => {
        return (
          <div key={item.product_id}>
            <CartItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
