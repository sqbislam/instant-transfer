// Import JWT for Authentication token and Bcrpyt for hashing pin
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
// importing user context
const FileAuth = require("../model/fileAuth");
// Import Error Keys
const errors = require("../errors");

// Register File using PIN code for unique token
exports.file_register = async (req, res) => {
  try {
    // Get user input
    const { content, pin } = req.body;
    const uid = pin;

    // Validate user input
    if (!(content && pin)) {
      res.status(400).send(errors.input_required);
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await FileAuth.findOne({ uid });

    if (oldUser) {
      return res.status(409).send(errors.already_exists);
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(pin, 10);

    // Create user in our database
    const fileAuth = await FileAuth.create({
      uid,
      pin: encryptedPassword,
      createdAt: Date.now(),
    });

    // Create token and Authentication QR Code
    const token = jwt.sign({ uid: fileAuth._id, pin }, process.env.TOKEN_KEY, {
      expiresIn: "10m",
    });
    // Generate qr code
    const dataImage = await qrcode.toDataURL(token);

    // Return new Token for file and QR code
    res.status(201).json({ token, dataImage });
  } catch (err) {
    console.log(err);
  }
};

// Login endpoint for authenticating user
exports.file_download = async (req, res) => {
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
};
