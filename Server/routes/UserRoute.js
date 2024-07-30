const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/registerUser", UserController.registerUser);
router.post("/loginUser", UserController.loginUser);
router.post("/verifyEmail", UserController.verifyEmail);
router.post("/validateToken", UserController.validateToken);

module.exports = router;
