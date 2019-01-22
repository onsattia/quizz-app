const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const students = require("./routes/students");
const quizz = require("./routes/quizz");
const ressources = require("./routes/ressources");

// Set up express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/students", students);
app.use("/quizz", quizz);
app.use("/ressources", ressources);

//port number
const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
  console.log(`Listenning on port ${port} ...`);
});
