const validateUser = require("../utils/validateUser");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const mail = require("../utils/mail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
let curDate = moment().format();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const CartService = require("../services/cart.service");
const userService = require("../services/user.service");
const { verifygoogleIdToken } = require("../utils");
const { createGoogleAccount } = require("../services/user.service");
const authService = require("../services/auth.service");

const createAccount = async (req, res, next) => {
  const { password, email, fullname, username } = req.body;

  if (validateUser(req.body)) {
    try {
      const user = await userService.getUserByEmail(email);

      if (user?.email === email)
        return res.status(500).json("Email exists already");

      if (user?.username === username)
        return res.status(500).json("Username taken already");

      const hashedPassword = await authService.hashPassword(password);
      const { user_id: userId } = await userService.createUser({
        ...req.body,
        password: hashedPassword,
      });

      const { id: cartId } = await CartService.createCart(userId);

      await mail.signupMail(email, fullname.split(" ")[0]);

      res.status(201).json({
        userId,
        cartId,
      });
    } catch (error) {
      next(error);
    }
  } else {
    next("Input validation error");
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (validateUser(req.body)) {
      const user = await userService.getUserByEmail(email);

      if (user) {
        const { password: dbPassword, user_id, roles, cart_id } = user;

        if (await comparePassword(password, dbPassword)) {
          const token = generateAccessToken({ id: user_id, roles, cart_id });
          const refreshToken = generateRefreshToken({
            id: user_id,
            roles,
            cart_id,
          });
          res.header("auth-token", token);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
          });
          res.status(200).json({
            token,
            user: {
              user_id,
            },
          });
        } else {
          next(new Error("Email or password incorrect."));
        }
      } else {
        next(new Error("Email or password incorrect."));
      }
    } else {
      next(new Error("Invalid login"));
    }
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong."));
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401);

  try {
    const ticket = await verifygoogleIdToken(token);
    const { name, email, sub, given_name } = ticket.getPayload();
    try {
      await createGoogleAccount({ sub, given_name, email, name });
      const { user_id, cart_id, roles } = await userService.getUserByEmail(
        email
      );
      const token = jwt.sign(
        { id: user_id, roles: roles, cart_id },
        process.env.SECRET
      );

      res.header("auth-token", token);
      res.status(200).json({
        token,
        user: {
          user_id,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "ID token required" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const isUserExist = await userService.getUserByEmail(email);

  if (isUserExist) {
    try {
      await authService.setTokenStatus(email);

      //Create a random reset token
      var fpSalt = crypto.randomBytes(64).toString("base64");

      //token expires after one hour
      var expireDate = moment().add(1, "h").format();

      await authService.createResetToken({ email, expireDate, fpSalt });

      await mail.forgotPasswordMail(fpSalt, email);
      res.json({ status: "OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    res.status(500).send("Email not found!");
  }
};

// verify password reset token
const verifyResetToken = async (req, res) => {
  const { token, email } = req.body;
  try {
    await authService.deleteResetToken(curDate);

    try {
      const isTokenValid = await authService.isTokenValid({
        token,
        email,
        curDate,
      });

      if (!isTokenValid) {
        res.json({
          message: "Token has expired. Please try password reset again.",
          showForm: false,
        });
      } else {
        res.json({
          showForm: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Unknown error", error);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const resetPassword = async (req, res) => {
  const { password, password2, token, email } = req.body;

  const isValidPassword =
    typeof password == "string" && password.trim().length >= 6;

  if (password !== password2)
    return res.json({ message: "Password do not match.", status: "error" });

  if (!isValidPassword)
    return res.json({
      status: "error",
      message: "Password length must be at least 6 characters",
    });

  try {
    const isTokenValid = await authService.isTokenValid({
      token,
      email,
      curDate,
    });

    if (!isTokenValid)
      return res.json({
        status: "error",
        message:
          "Token not found. Please try the reset password process again.",
      });

    try {
      await authService.setTokenStatus(email);

      const hashedPassword = hashPassword(password);

      try {
        await userService.changeUserPassword(hashedPassword, email);
        await mail.resetPasswordMail(email);
        res.json({
          status: "OK",
          message: "Password reset. Please login with your new password.",
        });
      } catch (error) {
        console.log(error);
        res.json(error);
      }
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const refreshToken = async (req, res) => {};

module.exports = {
  createAccount,
  loginUser,
  googleLogin,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};
