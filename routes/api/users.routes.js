const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/User.model");

//@route    POST api/users
//@desc     Post Register new user
//@access   Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //Simple validation
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    //Create salt and hash for the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            jwt.sign(
              { id: user.id }, //payload
              config.get("jwtSecret"), //jwt secret
              { expiresIn: 3600 }, //optional //3600 = 1 hour
              (err, token) => {
                // call back function to send token
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            );
          })
          .catch(err => {
            res.status(400).json(err);
          });
      });
    });
  });
});

module.exports = router;
