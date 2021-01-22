import React from "react";
import toast from "react-hot-toast";
import { useCart } from "context/CartContext";
import { Button, CardBody } from "@windmill/react-ui";
import authService from "services/auth.service";
import { useHistory } from "react-router-dom";

const Product = ({ cartId, product }) => {
  const user = authService.getCurrentUser();
  const history = useHistory();
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
    if (user !== null) {
      notify(addItem(cartId, product.product_id, 1));
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <img
        className="w-full h-56"
        src={product.image_url}
        alt={product.name}
      />
      <CardBody className="flex flex-col justify-between items-stretch">
        <p className="font-bold text-xl">{product.name}</p>
        <p className="font-medium">₦ {product.price}</p>
        <Button className="mt-4" onClick={(e) => addToCart(e)}>
          Add to cart
        </Button>
      </CardBody>
    </>
  );
};

export default Product;
