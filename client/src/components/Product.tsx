import { Button, CardBody } from "@windmill/react-ui";
import { useState } from "react";
import { ShoppingCart } from "react-feather";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { formatCurrency } from "../helpers/formatCurrency";

const Product = ({ product }) => {
  // const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await addItem(product, 1);
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="group">
        <span className="block relative h-48 rounded overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={product.imageUrl}
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
            iconLeft={() =>
              isLoading ? (
                <ClipLoader
                  cssOverride={{
                    margin: "0 auto",
                  }}
                  color="#123abc"
                  size={20}
                />
              ) : (
                <ShoppingCart className="mr-2" />
              )
            }
            className="mt-4 transition duration-200 ease-out lg:bg-opacity-0 group-hover:bg-opacity-100"
            onClick={(e) => addToCart(e)}
          >
            {isLoading ? null : "Add to Cart"}
          </Button>
        </CardBody>
      </div>
    </Link>
  );
};

export default Product;
