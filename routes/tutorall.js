const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/", (req, res) => {
  res.render("tutorall/index");
});
router.get("/register", (req, res) => {
  res.render("tutorall/register");
});
router.get("/start", (req, res) => {
  res.render("tutorall/start");
});
router.get("/teach/:_id", (req, res) => {
  res.render("tutorall/teach", { room_id: req.params._id });
});
router.get("/learn/:_id", (req, res) => {
  let offer;
  Room.find({
    _id: req.params._id
  }).then(room => {
    res.render("tutorall/learn", {
      teacherRTCSessionDescription: room[0].teacherRTCSessionDescription,
      room_id: req.params._id
    });
  });
});
module.exports = router;
