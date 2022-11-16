const express = require("express");
const router = express.Router();


const qr_controller = require("../controllers/qrController");

// POST Generate QR Code
router.post("/generate", qr_controller.generate_qrcode);

// POST Scan QR Code
router.post("/scan", qr_controller.scan_qrcode);

module.exports = router;