 express  = require("express");
 const app = express()
 const mongoose = require("mongoose");
 const postRoute = require("./routes/posts")
 const dotenv = require("dotenv");
 const URL = 'mongodb+srv://xarala:kvOBlkxcgeuppfw4@cluster0.8ezsbts.mongodb.net/?retryWrites=true&w=majority'
 dotenv.config()
 
app.use(express.json());
 mongoose.connect( URL,{
    useNewUrlParser:true,
    // useUnifieldTopology:true,
 }).then(console.log("data base connected !")).catch((err)=>{
    console.log(err);
 });


 app.use("/api/posts",postRoute);



 app.listen(5000,()=>{
    console.log("server Backend is runing");
 })






