require("dotenv").config();
const express = require('express');
const cors = require('cors')
const pool = require("./db")
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const session = require('express-session')

const PORT = process.env.PORT || 8080

const users = require("./routes/users")
const product = require("./routes/product")
const order = require("./routes/order")
const cart = require("./routes/cart")
const auth = require("./auth");
const passport = require("passport");

const app = express();

app.use(express.json())

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(cors())

app.use(morgan('dev'))

app.use("/auth", auth)
app.use("/api/users",users)
app.use("/api/products",product)
app.use("/api/orders",order)
app.use("/api/cart",cart)

app.get("/api", async (req, res, next)=> {
  try {
    const results = await pool.query("select * from users")
    console.log(results.rows);
  } catch (error) {
    console.log(error);
  }
  res.json({
    status: 'success',
    
  })
})

app.listen(PORT, ()=> console.log("Magic happening on port:", +PORT))
