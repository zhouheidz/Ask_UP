const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

passport.use(new GoogleStrategy({
    consumerKey: '1084488263408-p4k612ctk3mpsulfr9fpskuqde9fvjgp.apps.googleusercontent.com',
    consumerSecret: 'N7562kTaTFU8vqdGiE3UIYLF',
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
            password: '' 
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
