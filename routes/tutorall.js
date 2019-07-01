const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("tutorall/index");
});
router.get("/register", (req, res) => {
  res.render("tutorall/register");
});
router.get("/start", (req, res) => {
  res.render("tutorall/start");
});
module.exports = router;
