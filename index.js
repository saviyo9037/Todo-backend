const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

const connectDB = () => {
    mongoose.connect(process.env.URI)
    console.log("mongoDB connected Succesfully")
}

connectDB();

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions))
app.use("/api/v1",routes)

app.listen(5000, () => {
    console.log("server running on port 5000");
})