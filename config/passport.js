const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models').User;

passport.use(new GoogleStrategy({
    clientID: '374529978022-0pno5etd9pj63jqeun7eo8tgll6u8qsm.apps.googleusercontent.com',
    // clientID: '505652816138-lu9iqtrh4eq63oovgq81uge0ie98s2mp.apps.googleusercontent.com',
    // clientSecret: 'nK_FMWXElCSjjXUeTwwZc61M',
    clientSecret: 'iz9tG5H7BZNUasD4MBqQdKSD',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        console.log(profile);
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ where: { id: id } }).then(function(user) {
        done(null, user);
    });
});

module.exports = passport;
