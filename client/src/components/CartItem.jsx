import { useCart } from "context/CartContext";
import React from "react";

const CartItem = ({ item }) => {
  const {deleteItem} = useCart()
  // console.log(item)
  return (
    <div>
      <h1>Product Name: {item.name}</h1>
      <p>Description: {item.description}</p>
      <p>Price: ${item.price}</p>
      <p>
        <button>-</button>
        Quantity: {item.quantity}
        <button>+</button>
      </p>
      <button onClick={()=>deleteItem(item.product_id)}>Remove</button>
    </div>
  );
};

export default CartItem;
