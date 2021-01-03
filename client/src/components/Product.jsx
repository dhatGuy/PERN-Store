import React from 'react'
import toast from 'react-hot-toast';
import { useCart } from 'context/CartContext';

const Product = ({cartId, product}) => {
  const {addItem} = useCart()
  const notify = (data) => {
    return toast.promise(data, {
      loading: 'Adding to cart',
      success: 'Item added to cart',
      error: 'An error occured',
    });
  }
  const addToCart = async(e) => {
    e.stopPropagation()
    const add = addItem(cartId,product.product_id, 1)
    notify(add)
  }
  return (
      <ul>
        <li>id: {product.product_id}</li>
        <li>name: {product.name}</li>
        <li>price: {product.price}</li>
        <li>description: {product.description}</li>
        <button onClick={e=> addToCart(e)}>Add to cart</button>
      </ul>
  )
}

export default Product
