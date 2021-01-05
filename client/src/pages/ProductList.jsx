import Product from "components/Product";
import { useCart } from "context/CartContext";
import { useProduct } from "context/ProductContext";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductList = () => {
  const { products } = useProduct();
  const history = useHistory();
  const { cartData } = useCart();

  const selectProduct = (id) => {
    return history.push(`products/${id}`);
  };

  if (!products) {
    return <div>Loading</div>;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PERN Store</title>
        <meta
          name="description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://yourapp.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PERN Store" />
        <meta
          property="og:description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta property="og:url" content="https://yourapp.com" />
        <meta property="og:site_name" content="PERN Store" />
        <meta property="og:image" content="yourimage.jpg" />
        <meta property="og:image:secure_url" content="yourimage.jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta name="twitter:title" content="PERN Store" />
        <meta name="twitter:image" content="yourimage.png" />
      </Helmet>
      {products.map((prod) => (
        <div
          className="bg-red-900 mb-5"
          key={prod.product_id}
          onClick={() => selectProduct(prod.product_id)}
        >
          <Product cartId={cartData?.cartId} product={prod} />
        </div>
      ))}
      <Toaster position="bottom-right" />
    </>
  );
};

export default ProductList;
