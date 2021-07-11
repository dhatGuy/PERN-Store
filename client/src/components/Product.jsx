import { Button, CardBody } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React from "react";
import { ShoppingCart } from "react-feather";
import { formatCurrency } from "../helpers/formatCurrency";

const Product = ({ product }) => {
  const { addItem } = useCart();

  const addToCart = async (e) => {
    e.stopPropagation();
    await addItem(product, 1);
  };
  return (
    <div className="group">
      <span className="block relative h-48 rounded overflow-hidden">
        <img
          className="w-full h-full object-contain object-center"
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          decoding="async"
          title={product.name}
        />
      </span>
      <CardBody className="flex flex-col items-stretch mt-4">
        <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
          {product.name}
        </h2>
        <p className="">{formatCurrency(product.price)}</p>
        <Button
          iconLeft={ShoppingCart}
          className="mt-4 transition duration-200 ease-out lg:bg-opacity-0 group-hover:bg-opacity-100"
          onClick={(e) => addToCart(e)}
        >
          {" "}
          Add to cart
        </Button>
      </CardBody>
    </div>
  );
};

export default Product;
