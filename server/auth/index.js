const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../utils/mail")

router.get("/", (req, res) => {
  res.json({
    message: "🔐",
  });
});

const validateUser = (user) => {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.email.trim() != "" &&
    user.password.trim().length >= 6;

  return validEmail && validPassword;
};

router.post("/signup", async (req, res, next) => {
  const { username, password, email, fullname } = req.body;
  if (validateUser(req.body)) {
    const chkEmail = await pool.query("select * from users where email = $1", [
      email,
    ]);
    if (!chkEmail.rows[0]) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      try {
        const results = await pool.query(
          "INSERT INTO users(username, password, email, fullname) VALUES($1, $2, $3, $4) returning *",
          [username, hashedPassword, email, fullname]
        );
        res.status(200).json({
          status: "success",
          data: results.rows[0],
        });
        mail.signupMail(email, fullname.split(" ")[0])
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("Email is in use");
    }
  } else {
    res.status(500).json("Password must be greater than 5 characters.");
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (validateUser(req.body)) {
      const { email } = req.body;
      const results = await pool.query("select * from users where email = $1", [
        email,
      ]);

      if (results.rows.length > 0) {
        const user = results.rows[0];
        const { password, user_id, email, username, fullname } = user;
        const plainPassword = await bcrypt.compare(req.body.password, password);

        if (plainPassword) {
          const token = jwt.sign({ id: user.user_id }, process.env.SECRET);
          res.header("auth-token", token);
          res.status(200).json({
            token,
            user_id,
            email,
            username,
            fullname,
            status: "Login successful 🔓",
          });
        } else {
          next(new Error("Password incorrect"));
        }
      } else {
        next(new Error("User not found"));
      }
    } else {
      next(new Error("Invalid login"));
    }
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = router;
