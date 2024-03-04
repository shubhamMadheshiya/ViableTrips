const bcrypt = require("bcrypt");
const express = require("express");
const User = require('../model/user')
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();


const saltRounds = 10;

//register;

router.post("/register", async(req, res) => {

    try {
        const { phoneNumber, name, password, ...other } = req.body;


        !phoneNumber || !name || !password && res.status(404).json("please fill all required field")


        const isphone = await User.findOne({
          phoneNumber });
         isphone && res.status(403).json("user already exist");

         const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
          phoneNumber,
          name,
          password:hash,
        });

        const authdata = await newUser.save();
        res.status(201).json(authdata);
        
    } catch (error) {
        console.log(error)
         res.status(500).json(error);
        
    }
  

});


//login

router.get('/login',async(req,res)=>{
    try {

        

        const isphone = await User.findOne({phoneNumber:req.body.phoneNumber});
        !isphone && res.status(404).json('user not found')

        const hash = isphone.password;
        const result = await bcrypt.compare(req.body.password, hash);
        !result && res.status(401).json("wrong Password");

      
        
        
        const accessToken = jwt.sign(
          {
            id: isphone._id,
            isAdmin: isphone.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "30d" }
        );



        const {_id,phoneNumber, name, ...other} = isphone;
        

        res.status(200).json(`welcome ${name} your mobile number is ${phoneNumber} and token is ${accessToken} and id is ${_id}`)
        
    } catch (error) {
        console.log(error.message)

        res.status(500).json(error.message)
        
    }
})









module.exports = router;