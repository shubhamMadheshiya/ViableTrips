const express = require("express");
const WhyUs = require("../model/whyUs");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const whyUs = require("../model/whyUs");

const router = express.Router();

//create

router.post('/',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const whyUsData = new WhyUs(req.body);
    const savedData = await whyUsData.save()
    res.status(200).json(savedData)
    
  } catch (error) {

    res.status(500).json(error)


    
  }
});

// Update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const updateData = await whyUs(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(updateData)
    
  } catch (error) {

    res.status(500).json(error)
    
  }
});


//read

router.get()

module.exports = router;
