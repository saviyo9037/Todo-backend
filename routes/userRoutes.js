const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/get/:id",userController.getUser);
userRouter.put("/update/:id",userController.updateUser);
userRouter.delete("/delete/:id",userController.deleteUser);

module.exports = userRouter

