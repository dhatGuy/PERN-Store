import { Card, Pagination } from "@windmill/react-ui";
import Product from "components/Product";
import Spinner from "components/Spinner";
import { useCart } from "context/CartContext";
import { useProduct } from "context/ProductContext";
import Layout from "layout/Layout";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

const ProductList = () => {
  const { products, setPage } = useProduct();
  const history = useHistory();
  const { cartData } = useCart();

  const handleChange = (page) => {
    setPage(page);
  };

  const selectProduct = (id) => {
    return history.push({
      pathname: `products/${id}`,
    });
  };

  if (!products) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Spinner size={150} loading={!products} />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="py-20">
        <Card className="flex flex-wrap h-full mx-2">
          {products.map((prod) => (
            <div
              className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2 box-border"
              key={prod.product_id}
              onClick={() => selectProduct(prod.product_id)}
            >
              <Product cartId={cartData?.cartId} product={prod} />
            </div>
          ))}
          <Toaster position="bottom-right" />
        </Card>
        <Pagination
          totalResults={20}
          resultsPerPage={12}
          onChange={handleChange}
          label="Page navigation"
        />
      </div>
    </Layout>
  );
};

export default ProductList;
