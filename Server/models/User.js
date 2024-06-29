const mongoose = require("mongoose");

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

userSchema.methods.generateVerificationToken = async function () {
  const verificationToken = new verificationToken({
    userId: this._id,
    token: crypto.randomBytes(32).toString("hex"),
    expiresAt: Date.now() + 3600000,
  });
  await verificationToken.save();
  return verificationToken.token;
};

module.exports = mongoose.model("User", userSchema);
