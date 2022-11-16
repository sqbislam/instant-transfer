const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  uid:{type:String, unique:true },
  body: { type: String, default: null },
  type: { type:String },
  createdAt: { type: String },
  pin: { type: String },
});

module.exports = mongoose.model("textFile", textSchema);