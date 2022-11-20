const mongoose = require("mongoose");

const fileAuthSchema = new mongoose.Schema({
	uid: { type: String, unique: true },
	pin: { type: String, default: null },
	type: { type: String },
	createdAt: { type: String },
	expiredAt: { type: String },
});

module.exports = mongoose.model("fileAuth", fileAuthSchema);
