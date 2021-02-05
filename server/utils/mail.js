require("dotenv").config();
const nodemailer = require("nodemailer");
const html = require("./signup");

const url =
  process.env.NODE_ENV === "production"
    ? "https://nameless-journey-88760.herokuapp.com"
    : "http://localhost:3000";

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

const forgotPasswordMail = async (token, email) => {
  const message = {
    from: process.env.GMAIL_EMAIL,
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

  try {
    await transport
      .sendMail(message)
      .then((data) => console.log(data.response));
  } catch (error) {
    console.log(error);
    return error;
  }
};

const resetPasswordMail = async(email) =>{
  const message = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "Password Reset Successful",
    html: `<p>Your password has been changed successfully.</p>`,
  };

  try {
    await transport
      .sendMail(message)
      .then((data) => console.log(data.response));
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  signupMail,
  resetPasswordMail,
  forgotPasswordMail
};
