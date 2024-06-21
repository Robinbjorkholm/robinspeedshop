const express = require("express");
const router = express.Router();
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

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      category: req.body.category,
      image: req.body.image,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating product" });
  }
};
module.exports = { getProducts,createProduct };
