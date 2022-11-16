const express = require("express");
const router = express.Router();


const user_controller = require("../controllers/userController");


// POST Register User using name, email and pin
router.post("/register",user_controller.user_register);

// POST Login user using name and pin
router.post("/login", user_controller.user_login)

module.exports = router;