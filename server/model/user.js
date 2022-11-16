const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  pin: { type: String },
});

module.exports = mongoose.model("user", userSchema);