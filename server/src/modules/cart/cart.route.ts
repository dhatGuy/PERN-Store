import express from "express";
import verifyToken from "~/middlewares/verifyToken";
import { CartController } from "./cart.controller";

const router = express.Router();
const cartController = new CartController();

router.use(verifyToken);

// get cart items
router.route("/").get(cartController.getCart);

// add item to cart
router.route("/update").post(cartController.updateCart);

// delete item from cart
router.route("/delete").delete(cartController.deleteItem);

export default router;
