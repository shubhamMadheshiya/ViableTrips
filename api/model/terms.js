const mongoose = require("mongoose");

const subTitle = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dec: {
    type: String,
    required: true,
  },
});



// Define the schema
const termsAndConditionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitles:[subTitle]
  
});

// Create a model based on the schema
const TermsAndConditions = mongoose.model(
  "TermsAndConditions",
  termsAndConditionsSchema
);

module.exports = TermsAndConditions;
