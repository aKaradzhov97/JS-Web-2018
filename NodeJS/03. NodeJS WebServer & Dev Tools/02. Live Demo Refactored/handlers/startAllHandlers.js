//Page handlers
const faviconHandler = require('./faviconHandler');
const homeHandler = require('./homeHandler');
const staticFileHandler = require('./staticFileHandler');

module.exports = [faviconHandler, homeHandler, staticFileHandler];