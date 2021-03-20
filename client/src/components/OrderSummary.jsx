import { useCart } from 'context/CartContext'
import { formatCurrency } from 'helpers'
import React from 'react'

const OrderSummary = () => {
  const {cartData, cartSubtotal} = useCart()
  return (
    <div>
      <h1>Order Summary</h1>
      {cartData?.items.map(item=>(
        <ul>
          <li>{item.name}</li>
          <li>{formatCurrency(item.price)}</li>
          <li>{item.quantity}</li>
        </ul>
      ))}
      <span>{formatCurrency(cartSubtotal)}</span>
    </div>
  )
}

export default OrderSummary
