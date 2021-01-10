import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "services/cart.service";
import authService from "services/auth.service";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const user_id = authService.getCurrentUser()?.user_id;

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
    if (user_id)
      cartService
        .createCart()
        .then((res) => {
          return cartService.getCart(user_id);
        })
        .then((res) => {
          setCartData(res?.data);
        });
  }, [user_id]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addItem,
        deleteItem,
        increment,
        decrement,
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
