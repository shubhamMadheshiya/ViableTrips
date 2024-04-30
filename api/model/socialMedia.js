const mongoose = require("mongoose");

// Define the schema
const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const SocialMediaLink = mongoose.model("SocialMediaLink", socialMediaSchema);

module.exports = SocialMediaLink;
