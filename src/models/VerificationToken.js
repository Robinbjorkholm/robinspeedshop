import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String,
  expiresAt: Date,
});

const VerificationToken = mongoose.model.VerificationToken || mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationToken;
