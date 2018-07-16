const homeController = require('../controllers/home-controller');
const booksController = require('../controllers/books-controller');

module.exports = (app) => {
    app.get('/', homeController.getIndex);
    app.get('/addBook', booksController.getAddBook);
    app.post('/addBook', booksController.postAddBook);
    app.get('/viewAll', booksController.getAll);
    app.get('/books/details/:id', booksController.getDetails);
};