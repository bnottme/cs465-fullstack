const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');



const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields are required" });
  }

  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    await user.save();


    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ "message": "Registration failed" });
  }
};



const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields are required" });
  }


  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ "message": "Authentication error" });
    }
    if (!user) {
      return res.status(401).json({ "message": "Invalid email or password" });
    }

    const token = user.generateJwt();
    res.json({ token });
  })(req, res);
};



module.exports = { register, login };
