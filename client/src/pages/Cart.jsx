import CartItem from "components/CartItem";
import { useCart } from "context/CartContext";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const { cartData } = useCart();
  const [total, setTotal] = useState(0)

  
  useEffect(()=>{
    const data = cartData?.items.reduce((acc,cur) => {
      return acc + Number(cur.subtotal)
    }, 0)
    setTotal(Number(data))
  },[cartData?.items])
  
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
      <div>Total: ${total.toFixed(2)}</div>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
