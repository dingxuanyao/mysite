const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  teacher: {
    type: String,
    required: true,
    unique: true
  },
  teachersdp: {
    type: String
  },
  studentsdp: {
    type: String
  }
});

module.exports = room = mongoose.model("room", RoomSchema);
