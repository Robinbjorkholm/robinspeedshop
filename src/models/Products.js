const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  
});

module.exports = mongoose.model("Product", productSchema);
