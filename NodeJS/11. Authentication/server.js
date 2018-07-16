const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRouter = require('./auth');

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

let products = [
    {
        name: 'Mango',
        price: 15
    },
    {
        name: 'Bananen',
        price: 10
    },
    {
        name: 'Apfel',
        price: 10
    }
];

app.set('view engine', '.hbs');
app.use(cookieParser());
app.use(session({
    secret: 'some text'
}));
app.use(bodyParser.urlencoded({extended: true}));

//SESSION FIRST - THEN PASSPORT!
//app.use(passport.initialize());
//app.use(passport.session());

//HANDLING ROUTERS >> ROUTER FIRST - THEN MIDDLEWARE!
app.use('/auth', authRouter);

//MIDDLEWARE FUNC TO NOT ALLOW UNAUTHORIZED ACCESS TO SOME PAGES!
app.use((req, res, next) => {
    if (req.session.user === undefined) {
        return res.redirect('/auth/login');
    }
    next();
});

app.get('/', (req, res) => {
    const username = req.session.user.username;
    const numItems = (req.session.cart || []).length;
    const message = req.session.message;
    req.session.message = '';
    res.render('index', {products, numItems, message, username});
});

app.get('/add/:id', (req, res) => {
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const product = products[Number(req.params.id)];
    req.session.cart.push(product);
    req.session.message = 'Product added to cart!';
    res.redirect('/');
});

app.get('/readSession', (req, res) => {
    res.json(req.session);
});


app.get('/cart', (req, res) => {
    const items = req.session.cart ? req.session.cart : [];
    const numItems = items.length;
    const total = items.reduce((p, c, i, a) => p + c.price, 0);
    res.render('cart', {items, numItems, total});
});

app.get('/remove/:id', (req, res) => {
    const items = req.session.cart ? req.session.cart : [];
    const id = Number(req.params.id);
    req.session.cart = items.filter((p, i) => i != id);
    res.redirect('/cart');
});

app.listen(1355);