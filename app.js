const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const config = require("./config.json");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/snake", require("./routes/snake"));
app.use("/tutorall/api", require("./routes/api/api"));
app.use("/tutorall", require("./routes/tutorall"));
app.use("/", require("./routes/home"));

app.listen(80);
