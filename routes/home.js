const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/projects", (req, res) => {
  res.render("projects");
});

router.get("*", (req, res) => {
  res.render("error");
});

router.get("/dxy_resume2019.pdf", function(req, res) {
  var filePath = "/dxy_resume2019.pdf";

  fs.readFile(__dirname + filePath, function(err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
});
module.exports = router;
