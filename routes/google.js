const express = require('express');
const passport = require('../config/passport');
const User = require('../models').User;
const router = new express.Router();


router.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/userinfo.profile',
       'https://www.googleapis.com/auth/userinfo.email',
       'profile',
       'email'
       ] 
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
        failureRedirect: '/'
    }),
    function(req, res) {
        req.session.currentUser = req.user.displayName;
        res.redirect('/profile');
    }
);


module.exports = router;