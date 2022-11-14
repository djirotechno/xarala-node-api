const router = require("express").Router()
const User = require("../modeles/Users")
const bcrypt = require('bcrypt');


router.post("/register", async(req,res)=>{
    try{
        const salt= await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt)
        const newuser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });
        const user = await newuser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});



router.post("/login",async(req,res)=>{

    try{
        const user = await User.findOne({username:req.body.username});
    !user && res.status(400).json("cwrong credential")

    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json("wrong credential")
    const {password, ...others} = user._doc;
    res.status(200).json(others);

    }catch(err){
        res.status(500).json(err)
    }

    
})

module.exports = router;