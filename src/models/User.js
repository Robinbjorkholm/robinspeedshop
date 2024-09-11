import mongoose from "mongoose";
import countries from "countries-list";

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
      minlength: [9, "Password must be at least 9 characters long"],
      maxlength: [20, "Password must be no more than 20 characters long"],
    },
    address: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: true,
      length: 5,
      match: [/^\d{5}$/, "Postal code must be exactly 5 digits long"],
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
    verificationCode: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
