const router = require("express").Router();
const cart = require("./cart");
const order = require("./order");
const product = require("./product");
const reviews = require("./reviews");
const users = require("./users");
const auth = require("./auth");
const payment = require("./payment");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");

router.use("/auth", auth);
router.use("/users", users);
router.use("/products", product);
router.use("/orders", order);
router.use("/cart", cart);
router.use("/reviews", reviews);
router.use("/payment", payment);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
