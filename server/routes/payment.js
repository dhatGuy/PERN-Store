const { makePayment } = require("../controllers/payment.controller");

const router = require("express").Router();

router.route("/").post(makePayment);

module.exports = router;
