import { Card, CardBody } from "@windmill/react-ui";
import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  return (
    <Card colored className="bg-purple-600 w-64 mx-2">
      <CardBody>
        <p className="font-semibold text-white">{review.name}</p>
        <ReactStars
          count={5}
          size={24}
          edit={false}
          value={review.rating}
          activeColor="#ffd700"
        />
        <p className="text-white leading-tight">{review.content}</p>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
