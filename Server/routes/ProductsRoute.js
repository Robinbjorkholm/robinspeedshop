const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductsController");

router.get("/getProducts", productController.getProducts);
router.post("/createProducts", productController.createProduct);
module.exports = router;
