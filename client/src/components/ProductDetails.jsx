import { useCart } from 'context/CartContext'
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productService from 'services/product.service'
import Product from './Product'
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const {cartData} = useCart()
  
  useEffect(()=> {
    productService.getProduct(id)
    .then(res=> {
      setProduct(res.data[0])
    })
  },[id])


  if(!product){
    return <div>loading</div>
  }
  return (
    <div>
    <Product cartId={cartData.cartId} product={product}/>
    </div>
  )
}

export default ProductDetails

