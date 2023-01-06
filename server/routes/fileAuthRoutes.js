const express = require("express");
const router = express.Router();
const file_controller = require("../controllers/fileAuthController");
const auth_controller = require("../controllers/authController");

// POST Upload text for storing
router.post("/create", file_controller.file_register);

// GET Read text for displaying
router.get("/retrieve/:id", file_controller.file_download);

router.get("/getSession", auth_controller.get_authSession);

router.get("/claimSession", auth_controller.claim_authSession);
module.exports = router;
