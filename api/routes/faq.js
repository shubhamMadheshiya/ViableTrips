const express = require("express");
const FAQ = require("../model/faq");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router();

//create

router.post('/',verifyTokenAndAdmin,async(req,res)=>{

  const faqs = new FAQ(req.body)


  try {

    const dataFaq = await faqs.save()
    res.status(200).json(dataFaq);

    

  } catch (error) {

    res.status(500).json(error);
    
  }

});

//update

router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{

  try {
    const dataFaq = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(dataFaq);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
});


// get

router.get("/:id",  async (req, res) => {
  try {
    const dataFaq = await FAQ.findById(req.params.id);
    !dataFaq && res.status(404).json("Data not found");
    res.status(200).json(dataFaq);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all

router.get("/", async (req, res) => {
  try {
    const dataFaq = await FAQ.find();
    !dataFaq && res.status(404).json("Data not found");
    res.status(200).json(dataFaq);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete

router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
  try {

    const dataFaq = await FAQ.findByIdAndDelete(req.params.id);

    res.status(200).json(dataFaq);
    
  } catch (error) {
    res.status(500).json(error);
    
  }
})

module.exports = router;
