const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register",authController.createUser);
authRouter.post("/login",authMiddleware,authController.login);

module.exports = authRouter

