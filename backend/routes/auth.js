const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  //validation using express-validator
  [
    body("name").isLength({ min: 3 }).withMessage("Not a valid name"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Not a valid password"),
  ],
  //validation response if error occurs
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // create user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
