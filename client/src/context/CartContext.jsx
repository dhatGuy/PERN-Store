import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "services/cart.service";
import authService from "services/auth.service";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const user_id  = authService.getCurrentUser()?.user_id

  useEffect(() => {
    cartService
      .createCart()
      .then(() => {
        return cartService.getCart(user_id);
      })
      .then((res) => {
        setCartData(res.data);
      })
  }, []);

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () =>{
  const context = useContext(CartContext)
  if(context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart };
