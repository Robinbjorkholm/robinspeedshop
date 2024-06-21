// utils/generateVerificationToken.js
const jwt = require('jsonwebtoken');
const VerificationToken = require('../models/VerificationToken');

const generateVerificationToken = async (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h' 
  });
  const verificationToken = new VerificationToken({ userId: user._id, token, expiresAt: Date.now() + 3600000 });
  await verificationToken.save();
  return token;
};

module.exports = generateVerificationToken;