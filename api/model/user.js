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
      required: true,
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    profilePic: String,
    smoker: {
      type: Boolean,
      default: false,
    },
    anythingsElse: {
      type: String,
    },
    placesTraveled: [placeSchema],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
