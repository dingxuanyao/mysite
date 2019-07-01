const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const config = require("../../config.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Missing input");
    return res.status(400).json({ msg: "Missing input" });
  }

  User.findOne({ username }).then(
    user => {
      if (!user) return res.status(400).json({ msg: "User not found" });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

        const token = jwt.sign(user.toJSON(), config.jwtSecret, {
          expiresIn: "15m"
        });
        const { iat, exp } = jwt.decode(token);
        res.send({ iat, exp, token });
      });
    },
    reason => {
      console.log("Username not found");
      res.json({
        success: false,
        msg: reason
      });
    }
  );
});

router.post("/register", (req, res) => {
  //authenticate user
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Missing input");
    return res.status(400).json({ msg: "Missing input" });
  }
  const newUser = new User({
    username,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(
        user => {
          console.log("promise fulfilled");
          res.json({
            success: true,
            user: newUser.username
          });
        },
        reason => {
          console.log("promise denied");
          res.json({
            success: false,
            msg: reason
          });
        }
      );
    });
  });
});

router.post("/verify", async (req, res) => {
  //authenticate user
  const { token } = req.body;
  decoded = jwt.verify(token, config.jwtSecret, function(err, decoded) {
    if (err) return res.json({ success: false, msg: err });
    res.json({
      success: true,
      username: decoded.username
    });
  });
});

module.exports = router;
