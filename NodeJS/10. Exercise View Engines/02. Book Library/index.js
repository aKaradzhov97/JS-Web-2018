const express = require('express');
const settings = require('./config/settings');
const database = require('./config/database');
const server = require('./config/server');
const routes = require('./config/routes');

database(settings);

const app = express();

server(app);
routes(app);

const port = settings.development.port;
app.listen(port, () => {
    console.log(`Server up and running on port: ${port}.`);
});