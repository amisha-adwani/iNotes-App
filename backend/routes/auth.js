const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "puppy45";

//Route 1: signup using: POST "/api/auth/signup"
router.post(
  "/signup",
  //validation using express-validator
  [
    body("name").isLength({ min: 3 }).withMessage("Not a valid name"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Not a valid password"),
  ],
  //validation response if error occurs
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      //check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        }
      };
      //generate jwt token
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);

    } catch (error) {
      res.status(500).send("Error occured");
    }
  }
);

//Route 2: login using: POST "/api/auth/login"
router.post(
  "/login",
  //validation if credentials exists 
  [
    body("name").isLength({ min: 3 }).withMessage("Not a valid name").exists(),
    body("email").isEmail().withMessage("Not a valid email").exists(),
    body("password").isLength({ min: 5 }).withMessage("Not a valid password").exists(),
  ],
  //validation response if error occurs
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    //extract email and password from body
    const {email, password} = req.body
    try {
      //find if the user exists
      let user = await User.findOne({email})
      //if user doesn't exists through error
      if (!user) {
        res
          .status(400)
          .json({ error: "Incorrect login info" });
      }

      //if user exists compare the given password with the user data password
      const comparePassword = await bcrypt.compare(password, user.password)
      if(!comparePassword){
        res
        .status(400)
        .json({ error: "Incorrect login info" });
      }
      //if the password matches send the payload
      const data = {
        user: {
          id: user.id,
        }
      };
      //  send token
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
      
    } catch (error) {
      console.error(error.message)
       res.status(500).send("Error occured");
    }
  }
)
module.exports = router;
