const router = require("express").Router()

const Post = require("../modeles/Posts")



//CREATE
router.post("/",async(req,res)=>{
    const post = new Post(req.body);
    try{
        const savePost = await post.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async(req,res)=>{
    
        try {

            const postUpdate = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(postUpdate)
        } catch (error) {
             res.status(500).json(error)
    
        }
});

//DELETE
router.delete("/:id", async(req,res)=>{
        try{
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post supprime avec success")
        }catch(err){
            res.status(404).json(err);
        }
});


//GET POST
router.get("/:id", async(req,res)=>{
    if(req.params.id){ 
        try{
        const post = await Post.findById(req.params.id);
        const  {password, ...others} = post._doc
        res.status(200).json(others)
       
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("poste non trouve ")
    }
 
});

//GET ALL POST

router.get("/",async(req,res)=>{

if(Post){


}else{
    res.status(404).json("Aucun Post pour le moment")
}
    try {
        let posts;
        posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router;