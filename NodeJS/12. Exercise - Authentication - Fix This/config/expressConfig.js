const path = require('path');

const express = require('express');
const handlebars = require('express-handlebars');

const configureMiddleware = require('./middlewareConfig');
const configureRoutes = require('./routesConfig');

const app = express();

const viewsDir = path.join(__dirname, '../views');
app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: `${viewsDir}/layouts`
}));
app.set('view engine', '.hbs');
app.set('views', viewsDir);

require('./passportConfig');

configureMiddleware(app);
configureRoutes(app);

module.exports = app;