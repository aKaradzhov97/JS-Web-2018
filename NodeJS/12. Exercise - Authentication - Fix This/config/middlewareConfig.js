const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({
        secret: 'isThisEvenSecret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = {
                username: req.user.username
            }
        }

        next();
    });
};