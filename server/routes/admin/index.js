const product = require("./product");
const router = require("express").Router();

router.use("/products", product);

module.exports = router;
