const mongoose = require("mongoose");

// Define the schema
const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: {
    type: String,
    required: true,
  },
  link: String,
  order: {
    type: Number,
    default: 0,
    
  },
  active: {
    type: Boolean,
    default: true,
  },
  
},{timestamps:true});

// Create a model from the schema
const Carousel= mongoose.model("Carousel", carouselSchema);

module.exports=Carousel;
