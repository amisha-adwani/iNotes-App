const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
router.post(
  "/",
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
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10)
      const securedPass = await bcrypt.hash(req.body.password, salt)
      // create user
     await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      })
        .then((user) => res.json(user)) //send user as response
        .catch((err) => {
          console.log(err);
          res.json({ error: "Please enter a unique value" });
        });
    } catch (error) {
      res.status(500).send("Error occured");
    }
  }
);
// res.json(req.body)

module.exports = router;
