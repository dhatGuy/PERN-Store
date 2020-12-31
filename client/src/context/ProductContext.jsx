import React, { createContext, useEffect, useState } from "react";
import productService from "services/product.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    productService.getProducts().then((response) => {
      console.log(response);
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

export { ProductContext, ProductProvider };
