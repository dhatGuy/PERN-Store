import React, { createContext, useContext, useEffect, useState } from "react";
import productService from "services/product.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    productService.getProducts().then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, isLoading, setIsLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () =>{
  const context = useContext(ProductContext)
  if(context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}


export { ProductContext, ProductProvider, useProduct };
