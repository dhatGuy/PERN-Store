import API from "../api/axios.config";
import authHeader from "./authHeader";

const user_id = JSON.parse(localStorage.getItem("user"))?.user_id;

class ReviewService {
  getReviews(product_id) {
    return API.get(
      "/reviews",
      {
        params: {
          product_id,
          user_id,
        },
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new ReviewService();
