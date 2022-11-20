const express = require("express");
const router = express.Router();
const file_controller = require("../controllers/fileAuthController");

// POST Upload text for storing
router.post("/create", file_controller.file_register);

// GET Read text for displaying
router.get("/retrieve/:id", file_controller.file_download);

module.exports = router;
