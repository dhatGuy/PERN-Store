require("dotenv").config();
const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");
const { ErrorHandler } = require("../helpers/error");
const html = require("../helpers/signup");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const url =
  process.env.NODE_ENV === "production"
    ? "https://pern-store.netlify.app"
    : "http://localhost:3000";

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(`Failed to create access token :( ${err})`);
      }
      resolve(token);
    });
  });

  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_EMAIL,
      accessToken,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  return transport;
};

const signupMail = async (to, name) => {
  try {
    const message = {
      from: "pernstore.shop@gmail.com",
      to,
      subject: "Welcome to PERN Store",
      html: html(name),
    };

    let transport = await createTransporter();

    await transport.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const forgotPasswordMail = async (token, email) => {
  try {
    let transport = await createTransporter();
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

    const res = await transport.sendMail(message);
    return res;
  } catch (error) {
    logger.error(error);
    throw new ErrorHandler(500, error.message);
  }
};

const resetPasswordMail = async (email) => {
  try {
    let transport = await createTransporter();
    const message = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Password Reset Successful",
      html: "<p>Your password has been changed successfully.</p>",
    };

    await transport.sendMail(message);
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
