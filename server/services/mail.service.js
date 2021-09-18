require("dotenv").config();
const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");
const { ErrorHandler } = require("../helpers/error");
const html = require("../helpers/signup");

const transporter = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

const url =
  process.env.NODE_ENV === "production"
    ? "https://pern-store.netlify.app"
    : "http://localhost:3000";

const signupMail = async (to, name) => {
  try {
    const message = {
      from: "pernstore.shop@gmail.com",
      to,
      subject: "Welcome to PERN Store",
      html: html(name),
    };

    await transporter.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const forgotPasswordMail = async (token, email) => {
  try {
    const message = {
      to: email,
      subject: "Forgot Password",
      html: `<p>To reset your password, please click the link below.
      <a href="${url}/reset-password?token=${encodeURIComponent(
        token
      )}&email=${email}"><br/>
      Reset Password
      </a></p>
      <p><b>Note that this link will expire in the next one(1) hour.</b></p>`,
    };

    const res = await transporter.sendMail(message);
    return res;
  } catch (error) {
    logger.error(error);
    throw new ErrorHandler(500, error.message);
  }
};

const resetPasswordMail = async (email) => {
  try {
    const message = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Password Reset Successful",
      html: "<p>Your password has been changed successfully.</p>",
    };

    await transporter.sendMail(message);
  } catch (error) {
    logger.error(error);
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  signupMail,
  resetPasswordMail,
  forgotPasswordMail,
};
