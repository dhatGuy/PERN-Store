import React from "react";
import { useCart } from "context/CartContext";
import { Button, CardBody } from "@windmill/react-ui";
import authService from "services/auth.service";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ cartId, product }) => {
  const user = authService.getCurrentUser();
  const history = useHistory();
  const { addItem } = useCart();

  const addToCart = async (e) => {
    e.stopPropagation();
    if (user !== null) {
      addItem(cartId, product.product_id, 1);
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <img className="w-full h-56" src={product.image_url} alt={product.name} />
      <CardBody className="flex flex-col justify-between items-stretch">
        <p className="font-bold text-xl">{product.name}</p>
        <p className="font-medium">₦ {product.price}</p>
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
