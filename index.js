const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

const connectDB = async() => {
  try {
     await  mongoose.connect(process.env.URI)
    console.log("mongoDB connected Succesfully")
  } catch (error) {
    console.log(error)
  }
}

connectDB();


var corsOptions = {
  origin:  process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions))
app.use("/api/v1",routes)

app.listen(5000, () => {
    console.log("server running on port 5000");
})