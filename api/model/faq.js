const mongoose = require("mongoose");

// Define the schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  order:{
    type:Number,
    required:true,
    default:0,
    unique:true
  }
  
},{timestamps:true});

// Create a model from the schema
const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
