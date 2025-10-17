const User = require("../model/userModel");

const userController = {
  getUser : async (req,res) => {
    const getUser = await User.findById(req.params.id);

    if (!getUser) {
        res.status(400).send("user not found");
    }

    res.status(200).json({
        getUser
    })
  },
  updateUser : async (req,res) => {
    try {
        const {  name , email } = req.body;

        const userFound =  { name , email } 

        if (!name && !email) {
            res.status(404).send("invlaid data");
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id,
            userFound,
            {new:true}
          )

        if (!updateUser) {
            res.status(400).send("update not successfull");
        }
        res.status(200).json({
            message : "update succesfull",
            updateUser
        });
    } catch (error) {
        res.status(200).json({
            message :"login Succesfully",
            msg : error.message,
            stack : error.stack,
            error : error.error
        })
    }
  },
  deleteUser : async (req,res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            res.status(400).send("delete not successfull");
        }
        res.status(200).json({
            message : "delete succesfull",
            updateUser
        });
    } catch (error) {
        res.status(500).json({
            message :"internal server error",
            msg : error.message,
            stack : error.stack,
            error : error.error
        })
    }
  },
};

module.exports = userController;
