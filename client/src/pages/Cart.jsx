import CartItem from "components/CartItem";
import { useCart } from "context/CartContext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderService from "services/order.service";

const Cart = () => {
  const { cartData, setCartData } = useCart();
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0)
  const history = useHistory();

  const checkout = () => {
    OrderService.createOrder(cartData.cartId, total, totalItems).then((res) => {
      setCartData({ ...cartData, items: [] });
      history.push({
        pathname: `/checkout`,
        state: { detail: res.data },
      });
    });
  };

  useEffect(() => {
    const data = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.subtotal);
    }, 0);
    const items = cartData?.items.reduce((acc, cur) => {
      return acc + Number(cur.quantity);
    }, 0);
    setTotalItems(items)
    setTotal(Number(data));
  }, [cartData?.items]);

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
      <button onClick={() => checkout()}>Checkout</button>
    </div>
  );
};

export default Cart;
