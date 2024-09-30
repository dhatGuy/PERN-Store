import { google } from "googleapis";
import nodemailer, { Transporter } from "nodemailer";
import env from "~/env";
import { logger } from "../utils/logger";

const OAuth2 = google.auth.OAuth2;

export const createTransporter = async (): Promise<Transporter | null> => {
  try {
    const oauth2Client = new OAuth2(
      env.CLIENT_ID,
      env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise<string>((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        resolve(token as string);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.SMTP_USER,
        accessToken,
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
        refreshToken: env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const url =
  env.NODE_ENV === "production"
    ? "https://pern-store.netlify.app"
    : "http://localhost:5173";

const signupMail = async (to: string, name: string): Promise<void> => {
  try {
    const message = {
      from: env.SMTP_FROM,
      to,
      subject: "Welcome to PERN Store",
      html: `
        <p style="text-align: center;"><strong><span style="font-size: 17px;">Thank you for joining us </span></strong></p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Dear ${name},</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Thank you for registering on PERN store. We are glad to have you as a customer.</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>We welcome you to enjoy your freedom to shop anywhere, anytime.</p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; vertical-align: baseline; background: transparent; text-size-adjust: none; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 19px !important; font-weight: 300 !important; line-height: 30px !important;'><a href=${url}>Continue shopping</a></p>
        <p style='box-sizing: inherit; margin: 0px 0px 26px; padding: 0px; border: 0px; font-size: 19px !important; vertical-align: baseline; background: transparent; text-size-adjust: none; font-weight: 300 !important; line-height: 30px !important; color: rgb(12, 15, 51); font-family: "IBM Plex Sans", sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><br></p>  
      `,
    };

    const emailTransporter = await createTransporter();
    await emailTransporter?.sendMail(message);
  } catch (error) {
    logger.error(error);
  }
};

const forgotPasswordMail = async (
  token: string,
  email: string
): Promise<void> => {
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
    await emailTransporter?.sendMail(message);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const resetPasswordMail = async (email: string): Promise<void> => {
  try {
    const message = {
      from: process.env.SMTP_FROM as string,
      to: email,
      subject: "Password Reset Successful",
      html: "<p>Your password has been changed successfully.</p>",
    };

    const emailTransporter = await createTransporter();
    await emailTransporter?.sendMail(message);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export { forgotPasswordMail, resetPasswordMail, signupMail };
