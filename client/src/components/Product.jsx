import React from "react";
import toast from "react-hot-toast";
import { useCart } from "context/CartContext";
import { Button, CardBody } from "@windmill/react-ui";

const Product = ({ cartId, product }) => {
  const { addItem } = useCart();
  const notify = (data) => {
    return toast.promise(data, {
      loading: "Adding to cart",
      success: "Item added to cart",
      error: "An error occured",
    });
  };
  const addToCart = async (e) => {
    e.stopPropagation();
    const add = addItem(cartId, product.product_id, 1);
    notify(add);
  };
  return (
    <>
      <img className="w-full h-56" src="" alt="" />
      <CardBody className="flex flex-col justify-between items-stretch">
        <p>{product.name}</p>
        <p>$ {product.price}</p>
        <Button className="" onClick={(e) => addToCart(e)}>
          Add to cart
        </Button>
      </CardBody>
    </>
  );
};

export default Product;
