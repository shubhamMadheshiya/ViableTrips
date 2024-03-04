const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 
  message: {
    type: String,
    required: true,
  },
  // Additional fields, if needed
  phoneNumber: String,

},{timestamps:true});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
