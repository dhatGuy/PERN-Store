import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import cartService from "services/cart.service";
import { useUser } from "./UserContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState();
  const { userData, isLoggedIn } = useUser();

  const notify = (data) => {
    return toast.promise(data, {
      loading: "Adding to cart",
      success: "Item added to cart",
      error: "An error occured",
    });
  };
  useEffect(() => {
    if (userData?.token)
      cartService
        .getCart()
        .then((res) => {
          setCartData(res?.data);
        });
  }, [userData, isLoggedIn]);

  const addItem = async ( productId, quantity) => {
    const data = cartService.addToCart(cartData.cartId, productId, quantity);
    notify(data).then(({ data }) => {
      setCartData({ ...cartData, items: data.data });
    });
  };

  const deleteItem = (product_id) => {
    const { items, cartId } = cartData;
    cartService.removeFromCart(cartId, product_id).then(() => {
      const data = items.filter((item) => item.product_id !== product_id);
      setCartData({ ...cartData, items: data });
    });
  };

  const cartQuantity = cartData?.items?.reduce((acc, cur) => {
    return acc + Number(cur.quantity);
  }, 0);

  const increment = async (product_id) => {
    const res = await cartService.increment(cartData.cartId, product_id);
    setCartData({ ...cartData, items: res.data });
    return res;
  };
  const decrement = async (product_id) => {
    const res = await cartService.decrement(cartData.cartId, product_id);
    setCartData({ ...cartData, items: res.data });
    return res;
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addItem,
        deleteItem,
        increment,
        decrement,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
