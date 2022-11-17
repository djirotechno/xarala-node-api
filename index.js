 
 //  importation des dependances
 express  = require("express");
 const app = express()
 const mongoose = require("mongoose");
 const postRoute = require("./routes/posts")
 const dotenv = require("dotenv");
 dotenv.config()
 
app.use(express.json());

//connexion a la base de donnee mongoDb
 mongoose.connect( process.env.MONGO_URL,{
    useNewUrlParser:true,
    // useUnifieldTopology:true,
 }).then(console.log("data base connected !")).catch((err)=>{
    console.log(err);
 });



//point d'entre principale de notre API - Prend comme argument les routes
 app.use("/api/posts",postRoute);



 app.listen(5000,()=>{
    console.log("server Backend is runing");
 })






