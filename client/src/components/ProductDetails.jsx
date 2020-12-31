import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productService from 'services/product.service'
import Product from './Product'

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  
  useEffect(()=> {
    productService.getProduct(id)
    .then(res=> {
      setProduct(res.data[0])
      console.log(res.data);
    })
  },[id])


  if(!product){
    return <div>loading</div>
  }
  return (
    <div>
    <Product product={product} />
    </div>
  )
}

export default ProductDetails

