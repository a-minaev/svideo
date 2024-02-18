const express = require('express');
const database = express.Router();
const {
    returnMovies, 
    returnMovieByTitle,
    returnMovieByID,
    checkTitle,
    checkID,
    addMovie,
    checkQueryParams
} = require('./middleware');

database.param('id', (req, res, next, id) => {
    const movieID = id;
    // check for id in list

    req.id = movieID;
    next();

})


database.get('/movies', checkQueryParams, returnMovies, (req, res, next) => { //will use returnMovies
    res.status(200).send('Movie List is in development, check back soon!');
})

database.get('/movie/:id', checkID, returnMovieByID, (req, res, next) => {
    res.status(200).send(`Sorry, we're having trouble locating the current title`);
})

database.post('/movie', addMovie, (req, res, next) => {
    res.status(201).send('Posted!');
})

module.exports = database; 