
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");

const app = express();

app.use(express.json());

// importing user context
const User = require("./model/user");
// Import Error Keys
const errors = require("./errors")

// Register
app.post("/register", async (req, res) => {
    // Our register logic starts here
  
    try {
      // Get user input
      const { name, email, pin } = req.body;
      console.debug(req.body)
      // Validate user input
      if (!(email && pin && name)) {
        res.status(400).send(errors.input_required);
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send(errors.already_exists);
      }
  
      // Encrypt user password
      encryptedPassword = await bcrypt.hash(pin, 10);
  
      // Create user in our database
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        pin: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
  
      // return new user
      res.status(201).json({ token });
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


// Login
app.post("/login", async (req, res) => {
    // Our login logic starts here
  try {
    // Get user input
    const { email, pin } = req.body;

    // Validate user input
    if (!(email && pin)) {
      res.status(400).send(errors.input_required);
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(pin, user.pin))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json({ token });
    }
    return res.status(400).send(errors.invalid_credentials);
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

module.exports = app;