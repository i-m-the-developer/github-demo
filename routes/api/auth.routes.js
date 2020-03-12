const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Item Model
const User = require("../../models/User.model");

//@route    POST api/auth
//@desc    AUthenticate the user
//@access   Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User does not exists" });

      //Validate the password
      bcrypt.compare(password, user.password)
      .then(isMatch=>{
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

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
      
    })
    .catch(err=>console.log(err));
});

//@route    GET api/auth/user
//@desc    Get user data
//@access   Private
router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id)
  .select('-password')
  .then(user=>{
    res.send(user);
  })
})

module.exports = router;
