const mongoose = require("mongoose");

const authSession = new mongoose.Schema({
  sessionUID: { type: String, unique: true },
  clientContext: { type: String },
  userApprovalRequired: { type: Boolean, default: null },
  webUserSelection: { type: Boolean },
  createdAt: { type: String },
  expiredAt: { type: String, default: "30m" },
  status: { type: String, default: "NOT_CLAIMED" },
});

module.exports = mongoose.model("authSession", authSession);
