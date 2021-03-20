const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  payment = async (amount, email) => {
    try {
      return await stripe.paymentIntents.create({
        amount,
        currency: "ngn",
        payment_method_types: ["card"],
        receipt_email: email
      });
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
}

module.exports = new PaymentService();
