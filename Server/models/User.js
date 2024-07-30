const mongoose = require("mongoose");
const VerificationToken = require("./VerificationToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VerificationToken",
  },
});

userSchema.methods.generateJWT = function () {
  const user = this;
  const token = jwt.sign(
    { userId: user._id, email: user.email, admin: user.admin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

userSchema.methods.generateVerificationToken = async function () {
  const verificationToken = new VerificationToken({
    userId: this._id,
    token: crypto.randomBytes(32).toString("hex"),
    expiresAt: Date.now() + 3600000,
  });
  await verificationToken.save();
  return verificationToken.token;
};

userSchema.methods.verifyToken = async function (token) {
  const verificationToken = await VerificationToken.findOne({
    token,
    userId: this._id,
  });
  return verificationToken;
};
module.exports = mongoose.model("User", userSchema);
