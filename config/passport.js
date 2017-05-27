const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models').User;

passport.use(new GoogleStrategy({
    clientID: '374529978022-0pno5etd9pj63jqeun7eo8tgll6u8qsm.apps.googleusercontent.com',
    clientSecret: 'iz9tG5H7BZNUasD4MBqQdKSD',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    var fields = email.split('@');
    console.log(fields[1]);
    if(fields[1] !== "up.edu.ph") {
      done(new Error("Please use UP Mail"));
    } else {
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
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ where: { id: id } }).then(function(user) {
        done(null, user);
    });
});

module.exports = passport;
