import mongoose from "mongoose";
import VerificationToken from "./VerificationToken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
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
    verificationTokenString: { type: String },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.generateVerificationToken = async function (userId) {
  const verificationToken = new VerificationToken({
    userId,
    token: crypto.randomBytes(32).toString("hex"),
    expiresAt: Date.now() + 3600000,
  });
  await verificationToken.save();
  return verificationToken.token;
};

userSchema.methods.verifyToken = async function (token) {
  const validVerificationToken = await VerificationToken.findOne({
    token,
    userId: this._id,
  });
  return validVerificationToken;
};
const User = mongoose.model("User", userSchema);

export default User;
