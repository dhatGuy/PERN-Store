import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();
const paymentController = new PaymentController();

router.route("/").post(paymentController.makePayment);

export default router;
