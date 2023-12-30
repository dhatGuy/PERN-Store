require("dotenv").config();
const nodemailer = require("nodemailer");
const { logger } = require("../utils/logger");
const { ErrorHandler } = require("../helpers/error");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          logger.error(err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USER,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

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
      html: `
        <p style="text-align: center;"><strong><span style="font-size: 17px;">Thank you for joining us 😃</span></strong></p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Dear ${name},</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Thank you for registering on PERN store. We are glad to have you as a customer.</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>We welcome you to enjoy your freedom to shop anywhere, anytime.</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; vertical-align: baseline; background: transparent; text-size-adjust: none; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 19px !important; font-weight: 300 !important; line-height: 30px !important;'><a href=${url}>Continue shopping</a></p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><br></p>  
      `,
    };

    const emailTransporter = await createTransporter();
    await emailTransporter.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const forgotPasswordMail = async (token, email) => {
  try {
    const message = {
      to: email,
      subject: "Forgot Password",
      html: `
        <p>To reset your password, please click the link below.
          <a 
            href="${url}/reset-password?token=${encodeURIComponent(
        token
      )}&email=${email}"
          >
          <br/>
          Reset Password
          </a></p>
        <p>
          <b>Note that this link will expire in the next one(1) hour.</b>
        </p>`,
    };

    const emailTransporter = await createTransporter();
    return await emailTransporter.sendMail(message);
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

    const emailTransporter = await createTransporter();
    await emailTransporter.sendMail(message);
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
