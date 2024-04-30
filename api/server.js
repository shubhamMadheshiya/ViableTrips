require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); 
const cors = require('cors');
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
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
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/api/buddy", require("./routes/buddy"));
app.use("/api/auth", require("./routes/auth"));
app.use('/api/user',require("./routes/user"));
app.use("/api/blogs", require("./routes/blogs"));
app.use('/api/carousel',require("./routes/carousel"));
app.use("/api/faq", require("./routes/faq"));
app.use("/api/socialMedia", require("./routes/socialMedia"))
app.use("/api/whyUs", require("./routes/whyUs"));

app.use(errorHandler);




app.listen(port,(e)=> console.log(`sucessful listning to port number ${port}`))
