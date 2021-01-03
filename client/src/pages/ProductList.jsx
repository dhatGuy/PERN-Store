import Product from "components/Product";
import { useCart } from "context/CartContext";
import { useProduct } from "context/ProductContext";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const ProductList = () => {
  const {products} = useProduct()
  const history = useHistory()
  const {cartData} = useCart()

  const selectProduct = (id) =>{
    return history.push(`products/${id}`)
  }

  if(!products){
    return <div>Loading</div>
  }
  return (
    <>
    {products.map(prod=>(
      <div  key={prod.product_id} onClick={() => selectProduct(prod.product_id)}>
      <Product cartId={cartData?.cartId} product={prod}/>
      </div>
    ))}
        <Toaster position="bottom-right" />
    </>
  );
};

export default ProductList;
