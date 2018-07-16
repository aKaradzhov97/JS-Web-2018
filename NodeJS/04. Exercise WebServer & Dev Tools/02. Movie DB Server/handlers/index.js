const staticHandler = require('./staticHandler');
const errorHandler = require('./errorHandler');
const homeHandler = require('./homeHandler');
const moviesHandler = require('./movieHandler');

module.exports = [
    homeHandler,
    moviesHandler,
    staticHandler,
    errorHandler
];