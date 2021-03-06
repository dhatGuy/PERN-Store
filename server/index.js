require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

const routes = require("./routes")
const helmet = require('helmet')
const compression = require('compression')

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression())
app.use(helmet())

app.use("/api", routes);

app.get("/api", (req, res, next) => console.log('route is working'));

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ status: error.status, message: error.message, error: error.message.toString() });
});

app.listen(PORT, () => console.log("Magic happening on port:", +PORT));
