import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "services/cart.service";
import { useUser } from "./UserContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const {userData, isLoggedIn} = useUser()

  const addItem = async (cartId, productId, quantity) => {
    cartService.addToCart(cartId, productId, quantity).then((res) => {
      setCartData({ ...cartData, items: res.data.data });
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

  useEffect(() => {
    if (userData?.user_id)
      cartService
        .createCart()
        .then((res) => {
          return cartService.getCart(userData?.user_id);
        })
        .then((res) => {
          setCartData(res?.data);
        });
  }, [userData?.user_id, isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addItem,
        deleteItem,
        increment,
        decrement,
        cartQuantity
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
