const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: String,
  salt: String
});


userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
};



userSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};



userSchema.methods.generateJwt = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 Days expiration
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model('User', userSchema);
module.exports = User;
