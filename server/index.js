require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

const users = require("./routes/users");
const product = require("./routes/product");
const order = require("./routes/order");
const cart = require("./routes/cart");
const reviews = require("./routes/reviews");
const auth = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());


app.use(morgan("dev"));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/products", product);
app.use("/api/orders", order);
app.use("/api/cart", cart);
app.use("/api/reviews", reviews);

app.get("/api", async (req, res, next) => {
  try {
    res.send("<h1>This is the home route</h1>")
  } catch (error) {
    console.log(error);
  }
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ status: error.status, message: error.message });
});

app.listen(PORT, () => console.log("Magic happening on port:", +PORT));
