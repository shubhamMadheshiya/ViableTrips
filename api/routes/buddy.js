const express = require("express");
const Buddy = require("../model/buddy");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      city,
      profilePic,
      dateOfBirth,
      languages,
      gender,
      smoking,
      bankAccountNumber,
      ifscCode,
      file1,
      file2,
    } = req.body;

    // Validate request body fields
    if (
      !name ||
      !email ||
      !mobileNumber ||
      !city ||
      !profilePic ||
      !dateOfBirth ||
      !gender ||
      !file1 ||
      !file2
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new Buddy instance
    const buddyData = new Buddy({
      name,
      email,
      mobileNumber,
      city,
      profilePic,
      dateOfBirth,
      languages,
      gender,
      smoking,
      bankAccountNumber,
      ifscCode,
      file1,
      file2,
    });

    // Save the buddy to the database
    const savedBuddy = await buddyData.save();

    // Send response
    res.status(201).json("Sucessful");
  } catch (error) {
    console.error("Error in creating buddy:", error);
    // Send appropriate error response
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
