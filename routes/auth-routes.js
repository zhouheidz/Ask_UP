// const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models').User;
const passport = require('../config/passport');
const router = new express.Router();
const database = require('../database');

// router.post('/signin', function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
//     const remember = req.body.remember;

//     var verifyupmail = email.split('@');
//     if(verifyupmail[1] != 'up.edu.ph') {
//         console.log('please use up mail');
//     } else {
//         console.log('successful login');
//         res.redirect('/');
//     }

//     User.findOne({ where: { email: email } }).then(function(user) {
//         if (user === null) {
//             req.flash('signInMessage', 'Incorrect email.');
//             return res.redirect('/');
//         }

//         const match = bcrypt.compareSync(password, user.password);
//         if (!match) {
//             req.flash('signInMessage', 'Incorrect password.');
//             return res.redirect('/');
//         }

//         req.flash('statusMessage', 'Signed in successfully!');
//         req.session.currentUser = user.email;
//         if (remember) {
//             req.session.cookie.maxAge = 1000 * 60 * 60;
//         }
//         res.redirect('/profile');
//     });
// });

router.get('/signout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
