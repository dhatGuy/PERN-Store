import { useQuery } from "@tanstack/react-query";
import { Button, Rating } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "~/helpers/formatCurrency";
import { productBySlugQueryOptions } from "~/lib/queryOptions";

const ProductDetails = () => {
  const { slug } = useParams();
  const { data } = useQuery(productBySlugQueryOptions({ slug }));
  const navigate = useNavigate();

  const product = data.data;

  // const addToCart = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     await addItem(product, 1);
  //     toast.success("Added to cart");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error adding to cart");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section className="body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            decoding="async"
            loading="lazy"
            src={product?.imageUrl}
            alt={product?.name}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Rating>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Rating.Star key={i} filled={i < +product?.avgRating} />
                  ))}
                </Rating>
                <span className="ml-3">
                  {+product?.reviewCount > 0
                    ? `(${+product.reviewCount})`
                    : "(No ratings available)"}
                </span>
              </span>
            </div>
            <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
              {product?.description}
            </p>
            <div className="flex mt-4 justify-between">
              <span className="title-font font-medium text-2xl">
                {formatCurrency(product?.price)}
              </span>
              <Button className="border-0 focus:outline-none rounded">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
