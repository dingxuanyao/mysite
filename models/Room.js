const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const RTCSessionDescriptionSchema = new Schema({
  sdp: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const IceCandidateSchema = new Schema({
  candidate: {
    type: String,
    required: true
  },
  sdpMid: {
    type: String
  },
  sdpMLineIndex: {
    type: String
  },
  usernameFragment: {
    type: String
  }
});

const RoomSchema = new Schema({
  teacher: {
    type: String,
    required: true,
    unique: true
  },
  topic: {
    type: String,
    required: true
  },
  teacherRTCSessionDescription: RTCSessionDescriptionSchema,
  teacherIceCandidates: [IceCandidateSchema],
  studentRTCSessionDescription: RTCSessionDescriptionSchema,
  studentIceCandidates: [IceCandidateSchema]
});

module.exports = room = mongoose.model("room", RoomSchema);
