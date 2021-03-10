import { Button, Card, CardBody } from "@windmill/react-ui";
import ReviewCard from "components/ReviewCard";
import ReviewModal from "components/ReviewModal";
import Spinner from "components/Spinner";
import { useCart } from "context/CartContext";
import { useReview } from "context/ReviewContext";
import { useUser } from "context/UserContext";
import { formatCurrency } from "helpers";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory, useParams } from "react-router-dom";
import productService from "services/product.service";
import reviewService from "services/review.service";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const { reviews, setReviews } = useReview(null);
  const { addItem } = useCart();
  const { isLoggedIn } = useUser();

  const addToCart = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      addItem(product.product_id, 1);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    productService
      .getProduct(id)
      .then(({ data }) => {
        setProduct(data);
        return data;
      })
      .then((data) => {
        reviewService
          .getReviews(data.product_id)
          .then((data) => setReviews(data.data));
      });
  }, [id, setReviews]);

  if (!product || !reviews) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <Spinner size={150} loading={!product} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <Card className="flex lg:flex-row flex-col border mt-20 mb-12">
        <img
          className="sm:w-full md:w-1/2 lg:w-1/3 object-cover"
          decoding="async"
          loading="lazy"
          src={product.image_url}
          alt={product.name}
        />
        <CardBody className="flex flex-col items-start">
          <p className="text-4xl text-gray-600">{product.name}</p>
          <p className="mt-2 font-bold text-2xl">
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
            {""}(
            {+product.count > 0
              ? `${+product.count} ratings`
              : "No ratings available"}
            )
          </span>
          <p className="text-gray-600">{product.description}</p>
          <Button className="mt-4" onClick={(e) => addToCart(e)}>
            Add to cart
          </Button>
        </CardBody>
      </Card>
      <div className="mt-10">
        <h1 className="font-bold text-2xl">Product Reviews</h1>
        <div className="flex flex-wrap items-center content-end">
          <ReviewCard reviews={reviews.reviews} />
        </div>
        <div className="my-2 ml-2">
          {isLoggedIn && (
            <ReviewModal product_id={product.product_id} reviews={reviews} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
