import { useCart } from "context/CartContext";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const CartItem = ({ item }) => {
  const { decrement, increment, deleteItem } = useCart();

  const notify = (data) => {
    return toast.promise(data, {
      loading: "Changing quantity",
      success: "Quantity changed",
      error: "An error occured",
    });
  };

  const increase = () => {
    notify(increment(item.product_id));
  };
  const decrease = () => {
    notify(decrement(item.product_id));
  };
  return (
    <div>
      <h1>Product Name: {item.name}</h1>
      <p>Description: {item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Subtotal: ${item.subtotal}</p>
      <p>
        <button disabled={item.quantity === 1} onClick={() => decrease()}>
          -
        </button>
        Quantity: {item.quantity}
        <button onClick={() => increase()}>+</button>
      </p>
      <button onClick={() => deleteItem(item.product_id)}>Remove</button>
      <Toaster />
    </div>
  );
};

export default CartItem;
