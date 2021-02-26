const router = require("express").Router()
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .get(getAllProducts)
  .post(verifyToken, verifyAdmin, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(verifyToken, verifyAdmin, updateProduct)
  .delete(verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
