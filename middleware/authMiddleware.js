const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
require("dotenv").config();
const authMiddleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(400).send("token not found");
        }
        console.log(token,process.env.JWT_SECRET_KEY)
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if (!verifyToken) {
            res.status(400).send("token not verified");
        }

        const userFound = await User.find({email : verifyToken.email});
        req.user = userFound;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        Stack : error.stack,
        error : error.error 
        })
    }
}

module.exports = authMiddleware