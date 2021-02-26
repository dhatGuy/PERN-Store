const router = require("express").Router();
const { getReview, createReview, updateReview } = require("../controllers/reviews.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/")
  .get( getReview)
  .post(verifyToken, createReview)
  .put(verifyToken, updateReview);

module.exports = router;
