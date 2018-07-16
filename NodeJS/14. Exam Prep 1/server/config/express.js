const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');

//Configure folder & etc.
module.exports = (app) => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'isThisEvenSecret',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });

    //Directory for static files
    app.use(express.static('static'));

    console.log('Express ready!');
};
