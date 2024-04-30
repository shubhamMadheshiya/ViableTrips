const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: String,
  buddy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buddy", // referencing other users in the system
    },
  ],
  like: {
    type: Boolean,
    default: false,
  },
  review: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      unique: true,
      validate: {
        validator: function (v) {
          // Check if the phone number contains exactly 10 digits
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    name: {
      type: String,
      // required: [true, "Name is required."],
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
   

    profileUrl: String,
    smoker: {
      type: Boolean,
      default: false,
    },
    anythingElse: {
      type: String,
    },
    placesTraveled: [placeSchema],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

// Error handling middleware for unique constraint violation
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email or phone number already exists."));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
