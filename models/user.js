const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
           
        },
        lastName:{
            type: String,
            required: true,
           
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        Phone: {
            type: Number,
            required: true,
            unique:true
        },
        address : {
            type: String,
            required: true,
         
        },

        password:{
            type: String,
            required: true,
           
        },
        isFarmer: {
            type: String,
            default: "pending",
          },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User2", UserSchema);
module.exports = User;