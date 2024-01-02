const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getAllProductsAdmin,
} = require("../../controllers/products.controller");
const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken, verifyAdmin);

router.route("/").get(getAllProductsAdmin).post(createProduct);

router
  .route("/:slug")
  .get(getProductBySlug)
  .put(updateProduct)
  .delete(deleteProduct);

// router
//   .route("/:id/reviews")
//   .get(getProductReviews)
//   .post(verifyToken, createProductReview)
//   .put(verifyToken, updateProductReview);

module.exports = router;
