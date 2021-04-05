import { Button } from "@windmill/react-ui";
// import ReviewCard from "components/ReviewCard";
// import ReviewModal from "components/ReviewModal";
import { useCart } from "context/CartContext";
// import { useReview } from "context/ReviewContext";
import { formatCurrency } from "helpers/formatCurrency";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import productService from "services/product.service";
// import reviewService from "services/review.service";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const { reviews, setReviews } = useReview(null);
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (e) => {
    addItem(product.product_id, 1);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data: product } = await productService.getProduct(id);
      setProduct(product);
      // const { data: reviews } = await reviewService.getReviews(
      //   product.product_id
      // );
      // setReviews(reviews);
      setIsLoading(false)
    }
    fetchData();
  }, [id]);

  return (
    <Layout loading={isLoading}>
      <section className="body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              decoding="async"
              loading="lazy"
              src={product?.image_url}
              alt={product?.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={+product?.avg_rating}
                    activeColor="#ffd700"
                  />
                  <span className="ml-3">
                    {+product?.count > 0
                      ? `${+product.count} Ratings`
                      : "No ratings available"}
                  </span>
                </span>
              </div>
              <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
                {product?.description}
              </p>
              <div className="flex mt-4 ">
                <span className="title-font font-medium text-2xl">
                  {formatCurrency(product?.price)}
                </span>
                <Button
                  className="ml-auto border-0 focus:outline-none rounded"
                  onClick={(e) => addToCart(e)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="mt-10">
            <h1 className="font-bold text-2xl">Product Reviews</h1>
            <div className="flex flex-wrap items-center content-end">
              <ReviewCard reviews={reviews.reviews} />
            </div>
            <div className="m-2 mx-auto">
              {isLoggedIn && (
                <ReviewModal
                  product_id={product.product_id}
                  reviews={reviews}
                />
              )}
            </div>
          </div> */}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
