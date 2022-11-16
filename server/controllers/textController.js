
// JWT for authentication token
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

// Import model schemas
const textModel = require("../model/textFile")

// Import Error Keys
const errors = require("../errors")


// Logic to upload text file and parse data into QR-parsed object
exports.upload_text = async (req, res) =>{
    try {
        // Get Text input
        const { body, pin, uid } = req.body;
        const createdAt = Date.now()
    
        // Validate user input
        if (!(body && pin)) {
          res.status(400).send(errors.input_required);
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldTextFile = await textModel.findOne({ uid });
    
        if (oldTextFile) {
          return res.status(409).send(errors.already_exists);
        }
    
        // Encrypt user password
        encryptedPassword = await bcrypt.hash(pin, 10);
    
        // Create user in our database
        const textFile = await textModel.create({
          body,
          type:"Text",
          createdAt,
          pin: encryptedPassword,
          uid
        });
    
        // Create token with expiry of 5m
        const token = jwt.sign(
          { text_id: textFile._id, createdAt },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
    
        // return new text
        res.status(201).json({ token });
      } catch (err) {
        console.log(err);
      }
    }


exports.retrieve_text = async (req, res) =>{
    try {
         // Get Text input
         const { body, pin, uid } = req.body;
    }catch (err) {
        console.log(err);
      }
}