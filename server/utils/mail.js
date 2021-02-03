require("dotenv").config();
const nodemailer = require("nodemailer");
const html = require("./signup");

const url =
  process.env.NODE_ENV === "production"
    ? "https://nameless-journey-88760.herokuapp.com/api"
    : "http://localhost:9000/api";

var transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const signupMail = async (to, name) => {
  const message = {
    from: "pernstore.shop@gmail.com", // Sender address
    to, // List of recipients
    subject: "Welcome to PERN Store", // Subject line
    html: html(name),
  };

  try {
    await transport
      .sendMail(message)
      .then((data) => console.log(data.response));
  } catch (error) {
    return error;
  }
};

const resetPasswordMail = async (token, email) => {
  const message = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<p>To reset your password, please click the link below.
      <a href="${url}/auth/reset-password?token=${encodeURIComponent(
      token
    )}&email=${email}"><br/>
      Reset Password
      </a></p>
      <p><b>Note that this link will expire in the next one(1) hour.</b></p>`,
  };

  try {
    await transport
      .sendMail(message)
      .then((data) => console.log(data.response));
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  signupMail,
  resetPasswordMail,
};
