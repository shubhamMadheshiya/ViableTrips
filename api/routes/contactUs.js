const express = require("express");
const ContactUs = require("../model/contactUs");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();

//create

router.post('/',async(req,res)=>{
  const contactForm = new ContactUs(req.body)

  try {

    const contactData = await contactForm.save()

    res.status(200).json(contactData);
    
  } catch (error) {

    res.status(500).json(error)
    
  }

});

//update no need


//read

router.get('/:id',verifyTokenAndAdmin, async(req,res)=>{

  try {
     const contactUs = await ContactUs.findById(req.params.id);
     !contactUs && res.status(404).json("data not found");

     res.status(200).json(contactUs);

    
  } catch (error) {

    res.status(500).json(error);
    
  }

 
})

//read all

router.get('/',verifyTokenAndAdmin, async(req,res)=>{

  try {
     const contactUs = await ContactUs.find();
     !contactUs && res.status(404).json("data not found");

     res.status(200).json(contactUs);

    
  } catch (error) {

    res.status(500).json(error);
    
  }

 
})

//delete

router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const contactUs = await ContactUs.findByIdAndDelete(req.params.id);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})


module.exports = router;
