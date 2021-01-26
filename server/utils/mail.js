require("dotenv").config();
const nodemailer = require("nodemailer");
const html = require('./signup')

var transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const signupMail = async(to,name) => {
  const message = {
    from: "pernstore.shop@gmail.com", // Sender address
    to, // List of recipients
    subject: "Welcome to PERN Store", // Subject line
    html: html(name)
  };

  try {
    await transport.sendMail(message).then(data=>console.log(data.response))
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  signupMail
};
