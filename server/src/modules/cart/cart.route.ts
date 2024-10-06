import express from "express";
import verifyToken from "~/middlewares/verifyToken";
import { CartController } from "./cart.controller";

const router = express.Router();
const cartController = new CartController();

router.use(verifyToken);

// get cart items
router
  .route("/")
  .get(cartController.getCart)
  // add item to cart
  .put(cartController.updateCart)
  // delete item from cart
  .delete(cartController.deleteItem);

export default router;
