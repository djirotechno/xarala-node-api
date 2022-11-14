const router = require("express").Router()
const User = require("../modeles/Users")
const Post = require("../modeles/Posts")



//CREATE
router.post("/",async(req,res)=>{
    const post = new Post(req.body);
    try{
        const savePost = post.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async(req,res)=>{
   try {
    const post = Post.findById(req.params.id)
    if(post.username === req.body.username){
        try {
            const postUpdate = Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json("updated sucess!")
    res.status(500).json(error)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json(" you can update only you post")
    }
    
   } catch (error) {
    res.status(500).json(error)
    
   }
});

//DELETE
router.delete("/:id", async(req,res)=>{
    if(req.body.postId === req.params.id){
        try{
            
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("dellete success")
       
        }catch(err){
            res.status(404).json(err);
        }
    }else{
        res.status(401).json("you can DELETE only your account")
    }
 
});


//GET
router.get("/:id", async(req,res)=>{
    if(req.body.postId === req.params.id){
        try{
        const post = await Post.findById(req.params.id);
        const  {password,...others} = post._doc
        res.status(200).json(others)
       
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("post not found ")
    }
 
});

//GET ALL POST

router.get("/",async(req,res)=>{

    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{$in:[catName],

            },
        });

        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;