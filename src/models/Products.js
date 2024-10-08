const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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

      trim: true,
      default: "unknown",
    },
    image: {
      type: [String],
      required: false,
    },
    isOnSale: {
      type: Boolean,
      required: false,
      default: false,
    },
    saleDiscount: {
      type: Number,
      required: false,
      default: 0,
    },
    descriptionDisclaimers: {
      type: String,
      required: false,
      default: "",
    },
    kitIncludes: {
      type: [String],
      required: false,
      default: [],
    },
    amountOfPurchases: {
      type: Number,
      default: 0,
    },
    articleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    relatedProducts: {
      type: [String],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
