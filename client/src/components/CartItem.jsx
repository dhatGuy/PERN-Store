import React from 'react'

const CartItem = ({item}) => {
  return (
    <div key={item.product_id}>
      <h1>Product Name: {item.name}</h1>
      <p>Description: {item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  )
}

export default CartItem

