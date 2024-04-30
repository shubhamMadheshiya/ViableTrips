const express = require("express");
const Carousel = require('../model/carousel');

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { findById } = require("../model/blogs");

const router = express.Router();

// create
router.post('/', verifyTokenAndAdmin , async(req,res)=>{

  const carousel = new Carousel(req.body);
  try {

    const carouselData = await carousel.save()
    res.status(200).json(carouselData)

    
    
  } catch (error) {

    res.status(500).json(error)
    
  }
});


// update

router.put('/:id', verifyTokenAndAdmin , async(req,res)=>{
    try {
      const updateCarousel = await Carousel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateCarousel);
    } catch (err) {
      res.status(500).json(err);
    }
})


// get 

router.get('/:id',async(req,res)=>{
  try {
    const getCarousel = await Carousel.findById(req.params.id);
    !getCarousel && res.status(404).json("carousel not found")
    res.status(200).json(getCarousel);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})

// get all carousel

router.get('/', async(req,res)=>{
  try {

    const getAllCarousel = await Carousel.find();
    !getAllCarousel && res.status(404).json("Carousel not found");
    res.status(200).json(getAllCarousel);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})

//delete

router.delete('/:id', verifyTokenAndAdmin, async(req,res)=>{
try {

  const deletedCarosel = await Carousel.findByIdAndDelete(req.params.id);
  console.log(deletedCarosel);
   res.status(200).json(deletedCarosel);
  
} catch (error) {

  res.status(500).json(error)
  
}

  
})



module.exports =router;
