const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const TwitterPassport = require('passport-twitter');
const User = require('../models').User;

passport.use(new GoogleStrategy({
    clientID: '1084488263408-p4k612ctk3mpsulfr9fpskuqde9fvjgp.apps.googleusercontent.com',
    clientSecret: 'N7562kTaTFU8vqdGiE3UIYLF',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
    User.findOrCreate({
        where: { 
            email: profile.emails[0].value,
            name: profile.displayName 
        }, defaults: { 
            role: 'student' 
        }
    })
      return done(null, profile);
    });
  }
));

module.exports = passport;
