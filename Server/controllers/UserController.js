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
      return res.status(400).send("User already exists");
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

    const emailData = {
      to: user.email,
      subject: "robinspeedshop - Verify your email address",
      body: `Please verify your email address by clicking this link: ${process.env.BASE_URL_FRONTEND}/verify-email/${user._id}/${verificationToken}`,
    };
    await SendEmailController.sendEmail(req, res, emailData);

    res.send("User created successfully. Please verify your email address.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
};

module.exports = { registerUser };
