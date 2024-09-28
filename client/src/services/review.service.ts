import API from "../api/axios.config";

const user_id = JSON.parse(localStorage.getItem("user"))?.user_id;

class ReviewService {
  getReviews(product_id) {
    return API.get("/reviews", {
      params: {
        product_id,
        user_id,
      },
    });
  }
  addReview(product_id, rating, content) {
    return API.post("/reviews", {
      product_id,
      rating,
      content,
    });
  }

  updateReview(id, product_id, content, rating) {
    return API.put("/reviews", {
      id,
      content,
      rating,
      product_id,
    });
  }
}

export default new ReviewService();
