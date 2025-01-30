import mongoose from "mongoose";
import Counter from "@/models/Counter";

const orderSchema = new mongoose.Schema(
  {
    shippingOption: {
      courier: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
    paymentOption: {
      type: String,
      required: true,
      trim: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Pending",
    },
    orderUUID: {
      type: String,
      required: true,
    },
    orderPlacedDate: {
      type: Date,
      default: Date.now,
    },
    cartProducts: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
    price:{
      type:Number,
      required:true,
    },
    guestInfo: {
      email: {
        type: String,
        required: function () {
          return !this.user;
        },
      },
      firstName: {
        type: String,
        required: function () {
          return !this.user;
        },
      },
      lastName: {
        type: String,
        required: function () {
          return !this.user;
        },
      },
      country: {
        type: String,
        required: function () {
          return !this.user;
        },
      },

      city: {
        type: String,
        required: function () {
          return !this.user;
        },
      },
      address: {
        type: String,
        required: function () {
          return !this.user;
        },
      },
      phoneNumber: {
        type: Number,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
