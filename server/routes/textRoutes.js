const express = require("express");
const router = express.Router();
const text_controller = require("../controllers/textController");

// POST Upload text for storing
router.post("/upload", text_controller.upload_text)

// GET Read text for displaying
router.get("/retrieve/:id", text_controller.retrieve_text)

module.exports = router;