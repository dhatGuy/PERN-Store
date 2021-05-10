const authService = require("../services/auth.service");
const mail = require("../utils/mail");

const createAccount = async (req, res) => {
  const user = await authService.signUp(req.body);
  await mail.signupMail(user.email, user.fullname.split(" ")[0]);

  res.status(201).json({ userId: user.userId, cartId: user.cartId });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);

  res.header("auth-token", user.token);
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({
    token: user.token,
    user,
  });
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  const user = await authService.googleLogin(token);
  res.header("auth-token", user.token);
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
  });
  res.json(user);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword(email);

  res.json({ status: "OK" });
};

// verify password reset token
const verifyResetToken = async (req, res) => {
  const { token, email } = req.body;
  const isTokenValid = await authService.verifyResetToken(token, email);

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
};

const resetPassword = async (req, res) => {
  const { password, password2, token, email } = req.body;

  await authService.resetPassword(password, password2, token, email);

  res.json({
    status: "OK",
    message: "Password reset. Please login with your new password.",
  });
};

module.exports = {
  createAccount,
  loginUser,
  googleLogin,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};
