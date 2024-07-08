const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async ({ from, to, subject, body }) => {
  try {
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

    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: body,
    });

    console.log(`Email sent: ${info.response}`);
  } catch (err) {
    console.error(`Error sending email: ${err}`);
  }
};

module.exports = { sendEmail };
