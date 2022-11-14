const router = require("express").Router()
const Category = require("../modeles/Category");


router.post("/",async (req,res)=>{
    const newCat = new Category(req.body);
    try {
        const savecat = await newCat.save();
        res.status(200).json(savecat)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;