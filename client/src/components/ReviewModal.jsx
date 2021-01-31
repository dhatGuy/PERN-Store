import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  Textarea,
  HelperText,
} from "@windmill/react-ui";
import reviewService from "services/review.service";
import authService from "services/auth.service";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

const { user_id } = authService.getCurrentUser();
const ReviewModal = ({ isOpen, setIsOpen, product_id, reviews }) => {
  const review = reviews.reviews.find((elm) => elm.user_id === user_id);
  const { reviewExist } = reviews;
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const history = useHistory()

  // const notify = (msg) =

  const handleRating = (e) => {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setRating(value);
  };

  const addReview = () => {
    reviewService
      .addReview(product_id, rating, content)
      .then(() => {
        toast.success("Review added successfully");
        setRating(1);
        setContent("");
        history.go(0)
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
        console.log(error.response);
      });
    };
    
    const updateReview = () => {
      reviewService
      .updateReview(review.id,product_id, content, rating)
      .then(() => {
        toast.success("Review updated successfully");
        setRating(1);
        setContent("");
        history.go(0)
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
        console.log(error.response);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reviewExist ? updateReview() : addReview();
  };

  const toggleModal = () => {
    setRating(reviewExist ? review.rating : 1);
    setContent(reviewExist ? review.content : "");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <Button onClick={toggleModal}>
          {reviewExist ? "Edit Review" : "Add Review"}
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ModalHeader>Add Review</ModalHeader>
        <ModalBody>
          <form>
            <Label>
              <span>Rating</span>
              <Input
                type="number"
                name="rating"
                value={rating}
                className="mt-1"
                onChange={handleRating}
                min={1}
                max={5}
                maxLength={1}
              />
              <HelperText valid={false}>
                Rating must be between 1 and 5
              </HelperText>
            </Label>
            <Label>
              <span>Content</span>
              <Textarea
                className="mt-1"
                name="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you think about this product?"
              />
            </Label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={toggleModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            {reviewExist ? "Save" : "Add"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ReviewModal;
