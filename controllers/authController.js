const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(404).send("invalid data");
      }

      const userCheck = await User.findOne({ email });

      console.log(userCheck);

      if (userCheck) {
        res.status(400).send("user already exists");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const createUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      if (!createUser) {
        res.status(400).send("user is not created");
      }

      const payload = {
        name,
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      if (!token) {
        res.status(400).send("token is not created");
      }

      res.status(201).json({
        message: "user created succesfully",
        createUser,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        Stack: error.stack,
        error: error.error,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(404).send("invalid data");
      }

      const userCheck = await User.findOne({ email });
      console.log(userCheck);
      if (!userCheck) {
        res.status(400).send("user not exists");
      }

      const checkPassword = await bcrypt.compare(password, userCheck.password);

      if (!checkPassword) {
        res.status(400).send("password not matching");
      }

      const payload = {
        email: userCheck.email,
        name: userCheck.name,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      if (!token) {
        res.status(400).send("token not generated");
      }

      res.status(200).json({
        message: "login Succesfully",
        token,
      });
    } catch (error) {
      res.status(200).json({
        message: "login Succesfully",
        msg: error.message,
        stack: error.stack,
        error: error.error,
      });
    }
  },
};

module.exports = authController;
