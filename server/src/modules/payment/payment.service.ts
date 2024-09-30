import Stripe from "stripe";
import env from "~/env";

export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
      appInfo: {
        // For sample support and debugging, not required for production:
        name: "PERN Store",
        url: "https://github.com/dhatguy/pern-store",
        version: "0.0.2",
      },
      typescript: true,
    });
  }
  payment = async (amount: number, email: string) => {
    return await this.stripe.paymentIntents.create({
      amount,
      currency: "ngn",
      payment_method_types: ["card"],
      receipt_email: email,
    });
  };
}
