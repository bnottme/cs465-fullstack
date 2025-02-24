const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');




passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        return done(null, false, { message: "Invalid email or password" });
      }
      if (typeof user.validatePassword !== "function") {
        return done(null, false, { message: "User authentication error" });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));




passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid token" });
      }
    } catch (err) {
      return done(err, false);
    }
  }
));
