const Genre = require('../models/Genre');

module.exports.addGenreGet = (req, res) => {
    addGenre(req, res)
};

module.exports.addGenrePost = (req, res) => {
    addGenreProcess(req, res)
};

function addGenre(req, res) {
    res.render('genre/addGenre')
}

function addGenreProcess(req, res) {
    let genre = req.body;

    Genre.create(genre).then(() => {
        res.redirect('/')
    });
}