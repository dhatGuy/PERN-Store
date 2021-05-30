const googleLogin = require("./googleLogin");
const login = require("./login");
const signup = require("./signup");
const checkToken = require("./check-token");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./reset-password");
const refreshToken = require("./refresh-token");

module.exports = {
  "/auth/login": {
    ...login,
  },
  "/auth/signup": {
    ...signup,
  },
  "/auth/google": {
    ...googleLogin,
  },
  "/auth/refresh-token": {
    ...refreshToken,
  },
  "/auth/forgot-password": {
    ...forgotPassword,
  },
  "/auth/check-token": {
    ...checkToken,
  },
  "/auth/reset-password": {
    ...resetPassword,
  },
};
