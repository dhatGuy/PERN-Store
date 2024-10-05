import { Button } from "flowbite-react";
import { MouseEventHandler } from "react";
import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { Product } from "~/enitities/product";
import { formatCurrency } from "~/helpers/formatCurrency";

export const ProductItem = ({ product }: { product: Product }) => {
  const addToCart: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <Link
      className="w-full flex flex-col justify-between my-2 px-2 box-border"
      to={`/products/${product.slug}`}
    >
      <div className="group">
        <span className="block relative h-48 rounded overflow-hidden">
          <img
            className="w-full h-full object-contain object-center"
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            title={product.name}
          />
        </span>
        <div className="flex flex-col items-stretch mt-4 gap-2">
          <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
            {product.name}
          </h2>
          <p className="">{formatCurrency(product.price)}</p>
          <Button
            className="mt-4 transition duration-200 ease-out lg:bg-opacity-0 group-hover:bg-opacity-100"
            onClick={addToCart}
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};
