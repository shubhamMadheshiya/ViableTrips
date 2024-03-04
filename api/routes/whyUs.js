const express = require("express");
const WhyUs = require("../model/whyUs");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { find } = require("../model/blogs");

const router = express.Router();

// create
router.post('/',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const whyUsData = new WhyUs(req.body);
    const savedData  = await whyUsData.save()
    res.status(200).json(savedData);
    
  } catch (error) {

    res.status(500).json(error)
    
  }
})


// update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{

  try {

    const updateData = await WhyUs.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

    res.status(200).json(updateData);
    
  } catch (error) {

    res.status(500).json(error)
    
  }

});

//read

router.get('/',async(req,res)=>{
  try {
    const whyUsData = await WhyUs.find();
    !whyUsData && res.status(404).json("Data Not Found");

    res.status(200).json(whyUsData);
    
  } catch (error) {
    res.status(500).json(error)
    
  }
});


//delete

router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const deleteData = await WhyUs.findByIdAndDelete(req.params.id,{$set:req.body},{new:true});

    res.status(200).json(deleteData);
    
  } catch (error) {

    res.status(500).json(error)
    
  }
});





module.exports = router;
