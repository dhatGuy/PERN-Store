import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();
const paymentController = new PaymentController();

router.route("/stripe").post(paymentController.createStripePayment);

export default router;
