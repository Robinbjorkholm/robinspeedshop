const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    shippingMethod: {
      type: String,
      required: true,
    },
    paymentOption: {
      type: String,
      required: true,
      trim: true,
    },
    isPaid:{
        type:Boolean,
        default:false,
        
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);
const Order =
  mongoose.models.Product || mongoose.model("Order", ordersSchema);

export default Order;
