import express from "express";
import validateRequest from "~/middlewares/validateSchema";
import { ProductController } from "./product.controller";
import { productCreateSchema, productUpdateSchema } from "./product.schema";

const router = express.Router();
const productController = new ProductController();

router
  .route("/")
  .post(validateRequest(productCreateSchema), productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .put(validateRequest(productUpdateSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

router.get("/slug/:slug", productController.getProductBySlug);

router.get("/name/:name", productController.getProductByName);

export default router;
