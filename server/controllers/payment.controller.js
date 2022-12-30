const paymentService = require("../services/payment.service");

const makePayment = async (req, res) => {
  const { email, amount } = req.body;

  const result = await paymentService.payment(amount, email);
  res.json(result);
};

module.exports = {
  makePayment,
};
