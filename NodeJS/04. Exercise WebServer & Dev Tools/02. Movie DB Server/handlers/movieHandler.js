const qs = require('querystring');

let movies = require('../config/dataBase');

const moviePlaceholder = '{{replaceMe}}';
const movieTemplate =
    `<div class="movie">
        <img class="moviePoster" src="${moviePlaceholder}" />
     </div>`;

const errorTemplate = '<div id="errBox"><h2 id="errMsg">Please fill all fields!</h2></div>';
const successTemplate = '<div id="succssesBox"><h2 id="succssesMsg">Movie added!</h2></div>';

const movieDetailsTemplate =
    `<div class="content">
         <img src="{{placeholder}}" />
     </div> `;
module.exports = (req, res) => {
    let pathName = req.urlData.pathname;
    if (pathName === '/viewAllMovies' && req.method === 'GET') {
        moviesHtml = movies
            .map(m => movieTemplate.replace(moviePlaceholder, decodeURIComponent(m.moviePoster)))
            .join('');

        res.view('views/viewAll.html', moviesHtml);
    } else if (pathName === '/addMovie' && req.method === 'GET') {
        res.view('views/addMovie.html');
    } else if (pathName === '/addMovie' && req.method === 'POST') {
        let movieData = req.bodyData;
        if (!movieData.moviePoster || !movieData.movieTitle) {
            res.view('views/addMovie.html', errorTemplate);
            return;
        }

        movies.push(movieData);
        res.view('views/addMovie.html', successTemplate);
    } else if (pathName.startsWith('/movies/details/') && req.method === 'GET') {
        let index = pathName.substr(pathName.lastIndexOf('/') + 1);
        console.log('Index ' + index);
        movie = movies[index];
        console.log('Movie ' + movie);
        let movieHtml = movieDetailsTemplate.replace('{{placeholder}}', decodeURIComponent(movie.moviePoster));
        res.view('views/details.html', movieHtml);
    } else {
        return true;
    }
};