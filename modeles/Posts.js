const mongoose = require("mongoose");



const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        unique:true,
    },
    desc:{
        type:String,
        require:true
    },
    author:{
            type:String,
            require:true  
    },
    
},{timestamps:true})



module.exports = mongoose.model("Post",PostSchema);