require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); 
const cors = require('cors')

const port = 3000 || process.env.PORT;
const app = express();

app.use(express.json());


mongoose
  .connect(
    process.env.DB_URI
  )
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use('/api/user',require("./routes/user"));
app.use("/api/blogs", require("./routes/blogs"));
app.use('/api/carousel',require("./routes/carousel"));
app.use("/api/faq", require("./routes/faq"));
app.use("/api/socialMedia", require("./routes/socialMedia"))
app.use("/api/whyUs", require("./routes/whyUs"));






app.listen(port,(e)=> console.log(`sucessful listning to port number ${port}`))
