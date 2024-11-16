import mongoose from "mongoose";
import Order from "./Order.js";
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
    firstName: {
      type: String,
      minlength: [1, "firstname must be atleast 1 character long"],
      maxlength: [40, "firstname max length is 30 charcters"],
      required: true,
    },
    lastName: {
      type: String,
      minlength: [1, "lastname must be atleast 1 character long"],
      maxlength: [40, "lastname max length is 40 charcters"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    verificationCode: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
