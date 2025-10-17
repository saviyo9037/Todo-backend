const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        min : [3, "username should atleast 3 characters"]
    },
    email : {
        type :String,
        required : true
    },
    password :  {
        type : String,
        required :true,
        min : [8, "password should at least 8 characters"]
    }
})

const User = mongoose.model("users",userSchema);
module.exports = User