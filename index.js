 express  = require("express");
const app = express()

 const dotenv = require("dotenv");
 const mongoose = require("mongoose");
 const authRoute = require("./routes/auth")
 const userRoute = require("./routes/users")
 const postRoute = require("./routes/posts")
 
 dotenv.config()
app.use(express.json());
 mongoose.connect( 'mongodb+srv://xarala:kvOBlkxcgeuppfw4@cluster0.8ezsbts.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    // useUnifieldTopology:true,
 }).then(console.log("data base connected !")).catch((err)=>{
    console.log(err);
 });

app.use("/api/auths",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);



app.listen(5000,()=>{
    console.log("server Backend is runing");
})






