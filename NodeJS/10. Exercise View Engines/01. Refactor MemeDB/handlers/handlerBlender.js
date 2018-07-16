const homeHandler = require('./homeHandler');
const memeHandler = require('./memeHandler');
const genreHandler = require('./genreHandler');
// const staticHandler = require('./staticHandler')

module.exports = {
    home: homeHandler,
    meme: memeHandler,
    genre: genreHandler
};