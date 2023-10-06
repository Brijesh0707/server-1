// models/Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  mobile:{
    type:Number,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

module.exports = mongoose.model("Request", requestSchema);
