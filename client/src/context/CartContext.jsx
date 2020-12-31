import React, { createContext, useEffect, useState } from 'react';
import cartService from 'services/cart.service';

const CartContext = createContext()

const CartProvider = ({children})=>{
  const [cartData, setCartData] = useState(null)

  useEffect(()=>{
    cartService.createCart()
      .then(res=>{
        setCartData(res.data)
      })
  },[])

  return (
    <CartContext.Provider value={{cartData, setCartData}}>
      {children}
    </CartContext.Provider>
  )
}

export {CartProvider, CartContext}
