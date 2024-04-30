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
      // Add email validation
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNumber: {
      type: Number,
      required: true,
      // Add mobile number validation
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    city: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // Assuming storing URL to the photo
      required: true,
    },
    languages: {
      type: [String],
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
    smoking: {
      type: Boolean,
    },
    bankAccountNumber: {
      accNo: {
        type: Number,
        required: true,
      },
      ifsc: {
        type: String,
        required: true,
      },
    },
    file1: {
      type: String,
      required: true,
    },
    file2: {
      type: String,
      required: true,
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

// Pre-save hook for logging errors
buddySchema.pre("save", function (next) {
  const buddy = this;
  if (!buddy.isModified("email")) return next();

  // Check for email uniqueness
  mongoose.models.Buddy.findOne({ email: buddy.email })
    .then((existingBuddy) => {
      if (existingBuddy) {
        const err = new Error("Email already exists!");
        return next(err);
      }
      next();
    })
    .catch((err) => next(err));
});

const Buddy = new mongoose.model("Buddy", buddySchema);

module.exports = Buddy;
