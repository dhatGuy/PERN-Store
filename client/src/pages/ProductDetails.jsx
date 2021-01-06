import { Button, Card, CardBody } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import productService from "services/product.service";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartData, addItem } = useCart();

  const notify = (data) => {
    return toast.promise(data, {
      loading: "Adding to cart",
      success: "Item added to cart",
      error: "An error occured",
    });
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    const add = addItem(cartData?.cartId, product.product_id, 1);
    notify(add);
  };

  useEffect(() => {
    productService.getProduct(id).then((res) => {
      setProduct(res.data[0]);
    });
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div>loading</div>
      </Layout>
    );
  }
  return (
    <Layout title={product.name}>
      <Card className="flex border border-black">
        <img className="w-2/3 object-cover h-56" src="" alt="" />
        <CardBody className="flex flex-col justify-between items-start">
          <p>{product.name}</p>
          <p>$ {product.price}</p>
          <p>{product.description}</p>
          <Button className="" onClick={(e) => addToCart(e)}>
            Add to cart
          </Button>
        </CardBody>
      </Card>
      <Toaster position="bottom-right" />
    </Layout>
  );
};

export default ProductDetails;
