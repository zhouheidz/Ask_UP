// const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models').User;
const passport = require('../config/passport');
const router = new express.Router();
const database = require('../database');

router.get('/signout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
