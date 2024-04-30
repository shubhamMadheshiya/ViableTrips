const bcrypt = require("bcrypt");
const express = require("express");
const User = require('../model/user')
const otpService = require("../otpService");
const jwt = require("jsonwebtoken");
const logoutController = require("../controllers/logoutController");
const{ verifyJWT} = require('../middleware/verifyJWT');
const refreshTokenController = require("../controllers/refreshTokenController");

const router = express.Router();



// @route   POST /api/auth/send-otp
// @desc    Send OTP to phone number
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = otpService.generateOTP();
    // Send OTP via SMS (You can use Twilio or any other service)
    console.log(`Sending OTP (${otp}) to ${phone}`);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP
router.post("/verify-otp", (req,res,next) =>{
  const { phone, otp } = req.body;
  // Validate OTP (You can implement your logic here)
  const isValidOTP = otpService.validateOTP(otp);
  if (!isValidOTP) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  req.phoneNumber = phone;
  next()
}, async (req, res, next) =>{
  const phoneNumber = req.phoneNumber
  console.log(phoneNumber)
  
   try {
     const foundUser = await User.findOne({ phoneNumber });
     if (!foundUser) {
       const newUser = new User({ phoneNumber });
       const userData = await newUser.save();
       console.log(userData);
       req.userPhoneNumber = userData.phoneNumber
     } else{
      console.log(`found user is ${foundUser}`)
      req.userPhoneNumber = foundUser.phoneNumber;

     }
      
    
   } catch (error) {
     console.error(error);
      res.status(500).send("Server Error");
    
   }
  

   next()
  

},
async (req, res) => {

  const cookies = req.cookies;
  try {

  const phoneNumber = req?.userPhoneNumber
  const foundUser = await User.findOne({ phoneNumber });
      
         // create JWTs
         const accessToken = jwt.sign(
           {
             userInfo: {
               phoneNumber: foundUser.phoneNumber,
               id: foundUser._id,
               isAdmin: foundUser.isAdmin,
             },
           },
           process.env.ACCESS_TOKEN_SECRET,
           { expiresIn: "1m" }
         );
         const newRefreshToken = jwt.sign(
           { phoneNumber: foundUser.phoneNumber },
           process.env.REFRESH_TOKEN_SECRET,
           { expiresIn: "1d" }
         );

         // Changed to let keyword
         let newRefreshTokenArray = !cookies?.jwt
           ? foundUser.refreshToken
           : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

         if (cookies?.jwt) {
           /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
           const refreshToken = cookies.jwt;
           const foundToken = await User.findOne({ refreshToken }).exec();

           // Detected refresh token reuse!
           if (!foundToken) {
             // clear out ALL previous refresh tokens
             newRefreshTokenArray = [];
           }

           res.clearCookie("jwt", {
             httpOnly: true,
             sameSite: "None",
             secure: true,
           });
         }

         // Saving refreshToken with current user
         foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
         const result = await foundUser.save();

         // Creates Secure Cookie with refresh token
         res.cookie("jwt", newRefreshToken, {
           httpOnly: true,
           secure: true,
           sameSite: "None",
           maxAge: 24 * 60 * 60 * 1000,
         });

         // Send authorization roles and access token to user
         res.json({ accessToken, user:{
          id: foundUser?._id,
          name: foundUser?.name,
          email:foundUser?.email,
          phoneNumber:foundUser?.phoneNumber,
          profileUrl:foundUser?.profileUrl,
          admin:foundUser?.isAdmin,
         } });
     
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", async (req, res) => {
  // console.log("Registering user");
  // console.log(req.body)

  const { phoneNumber: phone, token, email, name } = req.body;

  // Verify the JWT token and handle the registration in the callback
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { phoneNumber } = decoded.userInfo;

    // Authorization check
    if (phone !== phoneNumber) {
      console.log("Not Authorized");
      return res.status(401).json("Not Authorized");
    }

    // Try to find the user based on phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (user) {
      // Update user details if found
      user.email = email;
      user.name = name;
      // user.isAdmin = isAdmin; // Assuming you want to update this as well
      const updatedUser = await user.save();

      console.log(updatedUser);
      res.status(200).json({
        message: "User details updated successfully",
        accessToken:token,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
          admin: updatedUser.isAdmin,
          profileUrl: updatedUser.profileUrl,
        },
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Handle JWT specific errors
      console.log(error);
      res.sendStatus(403); // Forbidden, invalid token
    } else {
      // Handle general errors
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
});


router.get("/refresh", refreshTokenController.handleRefreshToken);



router.post("/logOut", logoutController.handleLogout);











module.exports = router;