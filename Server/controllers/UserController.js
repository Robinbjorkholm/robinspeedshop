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
      const emailData = {
        from: "robinspeedshop",
        to: "bjorkholmrobin@gmail.com",
        subject: "robinspeedshop - Verify your email address",
        body: `Please verify your email address by clicking this link: 
              ${process.env.BASE_URL_FRONTEND}/verify-email/${user._id}/${verificationToken}`,
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
  res.send(Token);
};

module.exports = { registerUser, loginUser };
