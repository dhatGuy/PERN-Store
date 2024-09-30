import { Request, Response } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import { PaymentService } from "./payment.service";

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  createStripePayment = async (req: Request, res: Response) => {
    const { amount, email } = req.body;

    const result = await this.paymentService.createStripePayment(amount, email);

    res.json(ApiResponse.success("Payment created", result));
  };
}
