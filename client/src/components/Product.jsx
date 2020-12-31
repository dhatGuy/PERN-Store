import React from 'react'

const Product = ({product}) => {
  return (
      <ul>
        <li>id: {product.product_id}</li>
        <li>name: {product.name}</li>
        <li>price: {product.price}</li>
        <li>description: {product.description}</li>
      </ul>
  )
}

export default Product
