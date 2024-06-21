const nodemailer = require("nodemailer");
const User = require("../models/User");

sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: process.env.EMAIL_PORT,
    secure: process.env.SECURE,
    auth: {
      user: "robinspeedshop@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: "robinspeedshop",
    to,
    subject,
    text: body,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error while sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
};

module.exports = { sendVerificationEmail, sendEmail };
