import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";

const sendEmail = async ({ from, to, subject, html }) => {
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

    /*const templatePath = path.join(__dirname, "emailTemplate.ejs");
    const template = fs.readFileSync(templatePath, "utf8");
    const html = ejs.render(template, templateData);*/

    const data = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html,
      contentType: "text/html",
    });

    console.log(`Email sent: ${data.response}`);
  } catch (err) {
    console.error(`Error sending email: ${err}`);
  }
};

module.exports = { sendEmail };
