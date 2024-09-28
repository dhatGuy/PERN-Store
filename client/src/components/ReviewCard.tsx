import { Card, CardBody } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div>
        <p>No reviews yet</p>
      </div>
    );
  }
  return (
    <>
      {reviews.map((review) => (
        <Card
          colored
          className="bg-purple-600 w-64 mx-2 mt-2 flex-auto md:flex-none"
          key={review.id}
        >
          <CardBody>
            <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review.rating}
              activeColor="#ffd700"
            />
            <p className="text-white w-full leading-tight my-4">{review.content}</p>
            <p className="text-white text-opacity-60">{`${format(
              parseISO(review.date),
              "dd-MM-yy"
            )} by ${review.name}`}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default ReviewCard;
