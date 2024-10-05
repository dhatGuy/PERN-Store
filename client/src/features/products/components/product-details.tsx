import { Button, Rating } from "flowbite-react";
import { Product } from "~/enitities/product";
import { formatCurrency } from "~/helpers/formatCurrency";

export function ProductDetails({ product }: { product?: Product }) {
  if (!product) {
    return null;
  }

  return (
    <div className="max-w-screen-md mx-auto flex flex-wrap">
      <img
        loading="lazy"
        src={product.imageUrl}
        alt={product.name}
        className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
      />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h1 className="text-3xl title-font font-medium mb-1">{product.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <Rating>
              {Array.from({ length: 5 }, (_, i) => (
                <Rating.Star key={i} filled={i < product.avgRating} />
              ))}
            </Rating>
            <span className="ml-3">
              {product.reviewCount > 0 ? `(${product.reviewCount})` : "(No ratings available)"}
            </span>
          </span>
        </div>
        <p className="leading-relaxed pb-6 border-b-2 border-gray-800">{product.description}</p>
        <div className="flex mt-4 justify-between">
          <span className="title-font font-medium text-2xl">{formatCurrency(product.price)}</span>
          <Button className="border-0 focus:outline-none rounded">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
