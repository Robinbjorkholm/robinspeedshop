const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  titleNews: {
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
  isStockProduct: {
    type: Boolean,
    required: true,
    default: false,
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
  isOnSale: {
    type: Boolean,
    required: false,
  },
  saleDiscount: {
    type: Number,
    required: false,
    defautl: 0,
  },
  descriptionDisclaimers: {
    type: String,
    required: false,
  },
  kitIncludes: {
    type: String,
    required: false,
  },
  amountOfPurchases: {
    type: Number,
    default: 0,
  },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
