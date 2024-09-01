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
    required: false,
    default: null,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: [String],
    required: false,
  },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
