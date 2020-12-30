import React, { useEffect, useState } from "react";
import ProductService from "../services/product.service";

const Product = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ProductService.getProducts().then((response) => {
      console.log(response);
      setProducts(response.data)
      setIsLoading(false)
    });
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <>
    {products.map(product=>(
      <ul key={product.product_id}>
        <li>id: {product.product_id}</li>
        <li>name: {product.name}</li>
        <li>price: {product.price}</li>
        <li>description: {product.description}</li>
      </ul>
    ))}
    </>
  );
};

export default Product;
