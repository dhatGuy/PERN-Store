import Product from "components/Product";
import { ProductContext } from "context/ProductContext";
import React, { useContext  } from "react";
import { useHistory } from "react-router-dom";

const ProductList = () => {
  const {products} = useContext(ProductContext);
  const history = useHistory()


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
      <Product product={prod} />
      </div>
    ))}
    </>
  );
};

export default ProductList;
