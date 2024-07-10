require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRoute = require("./routes/ProductsRoute");
const userRoute = require("./routes/UserRoute");
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cors());
app.use("/products", productsRoute);
app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
