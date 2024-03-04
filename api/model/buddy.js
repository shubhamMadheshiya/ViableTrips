const mongoose = require("mongoose");

const buddySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String, // Assuming storing URL to the photo
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    idProofNumber: {
      type: String,
      required: true,
    },
    drivingLicense: {
      type: String,
    },
    bankAccount: {
      accNo: {
        type: Number,
        require: true,
      },
      ifsc: {
        type: String,
        require: true,
      },
    },
    languages: {
      type: [String],
    },
    licensePDFDoc: {
      type: String, // Assuming storing URL to the document
    },
    medicalCertificatePDF: {
      type: String, // Assuming storing URL to the document
    },
    travellers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // referencing other users in the system
      },
    ],
    approved: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Buddy = new mongoose.model("Mage", buddySchema);