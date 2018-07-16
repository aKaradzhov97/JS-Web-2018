const router = require('express').Router();
const encryption = require('./encryption');

const users = [];


//LOGIN
router.get('/login', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('login', {message});
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.filter(u => u.username === username)[0];
    if (user !== undefined) {
        const hashedPass = encryption.generateHashedPassword(user.salt, password);
        if (user.hashedPass === hashedPass) {
            req.session.user = {
                username
            };
            req.session.message = 'Login successful!';
            return res.redirect('/');
        }
    }
    req.session.message = 'Invalid user credentials!';
    res.redirect('/auth/login');
});


//REGISTER
router.get('/register', (req, res) => {
    const message = req.session.message;
    req.session.message = '';
    res.render('register', {message});
});

router.post('/register', (req, res) => {
    const {username, password, repeatPassword} = req.body;
    //DONT FORGET TO CHECK FOR EMPTY STRINGS
    if (username.length === 0 || password.length === 0 || repeatPassword.length === 0) {
        return error('Please fill all fields!');
    }
    if (password !== repeatPassword) {
        return error(`Passwords don't match!`);
    }
    //Check for already registered user
    if (users.filter(u => u.username === username).length > 0) {
        return error(`That username is already taken!`);
    }
    function error(message) {
        req.session.message = message;
        return res.redirect('/auth/register');
    }
    //Encrypt password
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, password);


    //Save data to dummy db
    const user = {
        username,
        salt,
        hashedPass
    };
    users.push(user);

    //Save user session
    req.session.user = {
        username
    };
    //Notification
    req.session.message = 'Registration successful!';
    return res.redirect('/');
});

module.exports = router;