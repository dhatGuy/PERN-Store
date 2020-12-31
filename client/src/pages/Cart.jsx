import { CartContext } from 'context/CartContext'
import React, { useContext } from 'react'

const Cart = () => {
  const {cartData} = useContext(CartContext)

  if(!cartData){
    return <div>loading...</div>
  }

  return (
    <div>
      {console.log(cartData)}
      cart page
    </div>
  )
}

export default Cart

