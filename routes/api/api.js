const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Room = require("../../models/Room");
const config = require("../../config.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
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
        console.log("User authenticated: " + username);
      });
    },
    reason => {
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
          res.json({
            success: true,
            user: newUser.username
          });
          console.log("User registered: " + username);
        },
        reason => {
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
    console.log("User verified: " + decoded.username);
  });
});

router.post("/createroom", async (req, res) => {
  //authenticate user
  const { teacher, topic } = req.body;
  const newRoom = new Room({
    teacher,
    topic
  });
  newRoom.save().then(
    room => {
      res.status(200).json({
        success: true,
        newRoom
      });
      console.log(
        "Room created:\n\tTeacher: " + teacher + "\n\tRoom ID: " + room._id
      );
    },
    reason => {
      res.status(400).json({
        success: false,
        msg: reason
      });
    }
  );
});

router.get("/getrooms", async (req, res) => {
  await Room.find().then(rooms => {
    res.status(200).json(rooms);
  });
});
router.post("/sendsdp", (req, res) => {
  if (req.body.type == "teach") {
    property_name = "teacherRTCSessionDescription";
  } else if (req.body.type == "learn") {
    property_name = "studentRTCSessionDescription";
  }
  Room.findOneAndUpdate(
    {
      _id: req.body.room_id
    },
    {
      [property_name]: req.body.RTCSessionDescription
    }
  ).then(
    () => {
      res.status(200).json({ success: true });
      console.log("SDP saved: \n\tType: " + property_name);
    },
    reason => {
      res.status(400).json({ success: false, msg: reason });
    }
  );
});
router.post("/getsdp", (req, res) => {
  if (req.body.type == "teach") {
    property_name = "teacherRTCSessionDescription";
  } else if (req.body.type == "learn") {
    property_name = "studentRTCSessionDescription";
  }
  Room.findOne(
    {
      _id: req.body.room_id
    },
    property_name
  ).then(
    document => {
      res.status(200).json(document);
      console.log("SDP retrieved: \n\tType: " + property_name);
    },
    reason => {
      res.status(400).json({ success: false, msg: reason });
    }
  );
});
router.post("/addicecandidate", (req, res) => {
  if (req.body.type == "teach") {
    property_name = "teacherIceCandidates";
  } else if (req.body.type == "learn") {
    property_name = "studentIceCandidates";
  }
  Room.findOneAndUpdate(
    {
      _id: req.body.room_id
    },
    { $push: { [property_name]: req.body.candidate } }
  ).then(
    document => {
      // { $push: { [property_name]: req.body. } }//add send ice candidate schema thing
      res.status(200).json({ success: true, candidate: req.body.candidate });
    },
    reason => {
      res.status(400).json({ success: false, msg: reason });
    }
  );
});

router.post("/removeroom", (req, res) => {
  Room.findOneAndDelete({
    _id: req.body.room_id
  }).then(
    () => {
      res.status(200).json({ success: true, room_id: req.body.room_id });
      console.log("Room removed: " + req.body.room_id);
    },
    reason => {
      res.status(400).json({ success: false, msg: reason });
    }
  );
});

router.post("/geticecandidates", (req, res) => {
  if (req.body.type == "teach") {
    property_name = "teacherIceCandidates";
  } else if (req.body.type == "learn") {
    property_name = "studentIceCandidates";
  }
  Room.findOne(
    {
      _id: req.body.room_id
    },
    property_name
  ).then(
    document => {
      res.status(200).json(document);
    },
    reason => {
      res.status(400).json({ success: false, msg: reason });
    }
  );
});
module.exports = router;
