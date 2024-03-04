const mongoose = require("mongoose");

// Define the schema
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

// Create a model from the schema
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
