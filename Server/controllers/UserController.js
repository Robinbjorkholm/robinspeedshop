const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const SendEmailController = require("./SendEmailController");

const registerUser = async (req, res) => {
  const { email, password, address, city, postalCode, country } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      admin: false,
      isVerified: false,
      address,
      city,
      postalCode,
      country,
    });
    await user.save();

    const verificationToken = await user.generateVerificationToken();
    if (verificationToken) {
      console.log(user._id);
      const emailData = {
        from: "robinspeedshop",
        to: "bjorkholmrobin@gmail.com",
        subject: "robinspeedshop - Verify your email address",
        html: `
          <p>Please verify your email address by clicking this <a href="${process.env.BASE_URL_FRONTEND}/verify-email/${user._id}/${verificationToken}">link</a></p>
        `,
      };
      await SendEmailController.sendEmail(emailData);
    }

    res.send("User created successfully. Please verify your email address.");
  } catch (error) {
    console.log(error);
    res.status(500).send("A problem occured when sending email");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).send("User with given email does not exist.");
  if (user.isVerified === false)
    return res.status(400).send("Email is not verified.");

  const validPassword = await bcrypt.compare(hashedPassword, user.password);
  if (!validPassword)
    return res.status(400).send("Incorrect Email or Password");

  const Token = user.generateJWT();
  res.set("Authorization", `Bearer ${Token}`);
};

const verifyEmail = async (req, res) => {
  const { id, token } = req.body;
  const user = await User.findById(id);

  if (!user) return res.status(400).send("user does not exist");

  if (!user.verifyToken(token)) return res.status(400).send("invalid token");

  try {
    await user.updateOne({ isVerified: true });
    res.send("Email verified you can now login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying email");
  }
};

const validateToken = async (req, res) => {
  const { id, token } = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(400).send("user does not exist");
  if (!(await user.verifyToken(token))) {
    return res.status(400).send("invalid token");
  }
  try {
    res.json({ success: true, message: "access granted" });
  } catch (error) {
    res.status(500).send("error with server");
  }
};

module.exports = { registerUser, loginUser, verifyEmail, validateToken };
