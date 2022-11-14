const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({


    username:{
        type:String,
        unique:true,

    },

    email:{
        type:String,
        require:true


    },

    password:{
        type:String,
        require:true


    },

    profilpic:{
        type:String,
        default:""


    },
    
},{timestamps:true})



module.exports = mongoose.model("User",UserSchema);