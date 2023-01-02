import {
  Backdrop,
  Button,
  HelperText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import reviewService from "services/review.service";

const ReviewModal = ({ product_id, reviews }) => {
  const { userData } = useUser();
  const review = reviews.reviews.find((elm) => elm.user_id === userData?.user_id);
  const { reviewExist } = reviews;
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const addReview = () => {
    reviewService
      .addReview(product_id, rating, content)
      .then(() => {
        toast.success("Review added successfully");
        setRating(1);
        setContent("");
        navigate(0);
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
      });
  };

  const updateReview = () => {
    reviewService
      .updateReview(review.id, product_id, content, rating)
      .then(() => {
        toast.success("Review updated successfully");
        setRating(1);
        setContent("");
        navigate(0);
      })
      .catch((error) => {
        toast.error("Error: ", error.response);
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
      {isOpen && <Backdrop />}
      <div>
        <Button onClick={toggleModal}>{reviewExist ? "Edit Review" : "Add Review"}</Button>
      </div>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ModalHeader>Add Review</ModalHeader>
        <ModalBody>
          <form>
            <Label>
              <span className="font-semibold">Rating</span>
              <ReactStars
                count={5}
                size={24}
                value={rating}
                onChange={(newRating) => setRating(newRating)}
                activeColor="#ffd700"
              />
            </Label>
            <Label className="mt-2">
              <span className="font-semibold">Content</span>
              <Textarea
                className="mt-1 border px-2"
                name="content"
                rows="3"
                value={content}
                valid={content.trim().length >= 10}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you think about this product?"
              />
            </Label>
            <HelperText valid={content.trim().length >= 10}>
              Content must have more than 10 characters
            </HelperText>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" layout="outline" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto"
            disabled={content.trim().length < 10}
          >
            {reviewExist ? "Save" : "Add"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ReviewModal;
