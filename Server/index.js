require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRoute = require("./routes/ProductsRoute");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());
app.use("/products", productsRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
