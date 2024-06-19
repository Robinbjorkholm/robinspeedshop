const Product = require("../models/Products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProducts };
