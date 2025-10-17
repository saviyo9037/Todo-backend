const express = require("express");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");

const router = express();

router.use("/user",userRouter);
router.use("/auth",authRouter)

module.exports = router

