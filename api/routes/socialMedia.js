const express = require("express");
const SocialMedia = require("../model/socialMedia");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { route } = require("./blogs");

const router = express.Router();

//create

router.post('/',verifyTokenAndAdmin,async(req,res)=>{
  try {
    const socialMediaData =new SocialMedia(req.body);
    const saveData = await socialMediaData.save()
    res.status(200).json(saveData);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
});

//Update

router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const socialMediaData = await SocialMedia.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(socialMediaData);
    
  } catch (error) {
    res.status(500).json(error)
    
  }
})

//read

router.get('/',async(req,res)=>{
  try {

    const socialMedia = await SocialMedia.find();
    res.status(200).json(socialMedia);
    
  } catch (error) {

    res.status(500).json(error)
    
  }
});

// delete

router.delete('/:id',async(req,res)=>{
  try {
    const deleteSocialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteSocialMedia);
    
  } catch (error) {
     res.status(500).json(error);
    
  }
})

module.exports = router;
