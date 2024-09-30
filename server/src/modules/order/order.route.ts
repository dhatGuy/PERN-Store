import express from "express";
import verifyToken from "~/middlewares/verifyToken";
import { OrderController } from "./order.controller";

const router = express.Router();
const orderController = new OrderController();

router.use(verifyToken);

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder)
  .put(orderController.updateOrder);

router.route("/:id").get(orderController.getOrder);

export default router;
