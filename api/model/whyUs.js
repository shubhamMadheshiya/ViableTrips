const mongoose = require("mongoose");

const whyUschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
        type: String,
        required: true,
    },
    order:{
      type:Number,
      unique:true,
      required:true,

    }
  
});

const whyUs = mongoose.model("whyUs", whyUschema);

module.exports = whyUs;
