import { Button, CardBody } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import { useUser } from "context/UserContext";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { formatCurrency } from "../helpers";

const Product = ({ product }) => {
  const { isLoggedIn } = useUser();
  const history = useHistory();
  const { addItem } = useCart();

  const addToCart = async (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      addItem(product.product_id, 1);
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <span href="" className="block relative h-48 rounded overflow-hidden">
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
        <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">{product.name}</h2>
        <p className="">
          {formatCurrency(product.price)}
        </p>
        <span className="flex items-center">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={+product.avg_rating}
            activeColor="#ffd700"
          />
          {""}({+product.count})
        </span>
        <Button className="mt-4" onClick={(e) => addToCart(e)}>
          Add to cart
        </Button>
      </CardBody>
    </>
  );
};

export default Product;
