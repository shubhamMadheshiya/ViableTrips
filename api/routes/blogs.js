const express = require("express");
const Blogs = require("../model/blogs");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../model/user");

const router = express.Router();


//create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {

    

    const blogsData = new Blogs(req.body);

    const saveBlogs = await blogsData.save()
    res.status(200).json(saveBlogs);

  } catch (error) {
    res.status(500).json(error);

  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  // if (req.body.password) {
  //   req.body.password = CryptoJS.AES.encrypt(
  //     req.body.password,
  //     process.env.PASS_SEC
  //   ).toString();
  // }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//find a blog



router.get('/:id',async(req,res)=>{
  try {
    const blogs = await Blogs.findById(req.params.id)
    !blogs && res.status(404).json("blogs not found");
    res.status(200).json(blogs)


  } catch (error) {

    res.status(500).json(error);
    
  }
})


//find all blogs

router.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.find()
    !blogs && res.status(404).json("blogs not found");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});


//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {

    const delUser = await User.findByIdAndDelete(req.params.id);
    console.log(delUser);
    res.status(200).json("User has been deleted...");
    
  
   
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
