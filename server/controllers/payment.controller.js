const paymentService = require("../services/payment.service");

const makePayment = async (req, res) => {
  const { email, amount } = req.body;
  try {
    const result = await paymentService.payment(amount, email);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  makePayment,
};
