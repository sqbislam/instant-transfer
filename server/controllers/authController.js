// Import JWT for Authentication token and Bcrpyt for hashing pin
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
// importing user context
const AuthSession = require("../model/authSession");
// Import Error Keys
const errors = require("../errors");

// Register File using PIN code for unique token
exports.get_authSession = async (req, res) => {
  try {
    // Get existing session if any.
    const sessionUID = req.query?.sessionUID;
    if (sessionUID) {
      // Handle flow for existing session ID
      console.log({ sessionUID });
      // check if session already exist
      // Validate if session exist in our database
      const oldSession = await AuthSession.findOne({ sessionUID });

      if (oldSession) {
        return res.status(409).send(errors.already_exists);
      }
    } else {
      // Create new session and send relevant data.
      const sessionUID = uuidv4();

      // Create an entry in DB for the new session with it's ID

      // Create user in our database
      const newAuthSession = await AuthSession.create({
        sessionUID,
        clientContext: sessionUID,
        userApprovalRequired: true,
        webUserSelection: true,
        createdAt: Date.now(),
        status: "NOT_CLAIMED",
      });
      // Create a new token and Authentication Session
      const token = jwt.sign(
        { uid: newAuthSession._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10m",
        }
      );

      // Return new Token for file and QR code
      res.status(201).json({ token, sessionUID });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.claim_authSession = async (req, res) => {
  try {
    const { sessionUID } = req.query?.sessionUID;
    const updatedSession = await AuthSession.findOneAndUpdate(
      { sessionUID: sessionUID },
      { status: "CLAIMED" }
    );
    // Return new Token for file and QR code
    res.status(201).json({ sessionUID });
  } catch (err) {
    console.error(err);
  }
};
