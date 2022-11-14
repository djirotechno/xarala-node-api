const router = require("express").Router()
const User = require("../modeles/Users")
const Post = require("../modeles/Posts")
const bcrypt = require("bcrypt")

//UPDATE
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt= await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
        const userUpdate = await User.findByIdAndUpdate(req.params.id,
            {
            $set:req.body,
        },{new:true})
      res.status(200).json(userUpdate)
       
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("you can update only your account")
    }
 
});

//DELETE
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
            res.status(200).json("dellete success")
            }catch(err){
            res.status(500).json(err)

            }
       
        }catch(err){
            res.status(404).json(err);
        }
    }else{
        res.status(401).json("you can DELETE only your account")
    }
 
});


//GET
router.get("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
        const user = await User.findById(req.params.id);
        const  {password,...others} = user._doc
        res.status(200).json(others)
       
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("user not found ")
    }
 
});



module.exports = router;