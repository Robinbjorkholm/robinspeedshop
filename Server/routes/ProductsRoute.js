const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductsController");

router.get("/getProducts", productController.getProducts);

module.exports = router;
