const mongoose = require("mongoose");

const mongooseSchema = mongoose.Schema({
     user_name:{
         type:String,
         required:true,
         min:2
     },
     user_email:{
        type:String,
        required:true,
        min:6
    },
    user_password:{
        type:String,
        required:true,
        min:6
    },
    // user_mobile:{
    //     type:Integer,
    //     required:true,
    //     min:10,
    //     max:10
    // }
    refreshtoken:{
        type:String
    }
})

const mongooseModal = mongoose.model("users",mongooseSchema)

module.exports = mongooseModal;