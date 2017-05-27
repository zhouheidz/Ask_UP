const express = require('express');
const passport = require('../config/passport');
const User = require('../models').User;
const router = new express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/userinfo.profile',
       'https://www.googleapis.com/auth/userinfo.email'
       ] 
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
        failureRedirect: '/',
        failureFlash:true
    }),
    function(req, res) {
        req.session.currentUser = req.user.emails[0].value;
        console.log(req.session.currentUser);
        res.redirect('/home');
    }
);


module.exports = router;