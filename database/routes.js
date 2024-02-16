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


database.get('/movies', returnMovies, (req, res, next) => { //will use returnMovies
    res.status(200).send('Movie List is in development, check back soon!');
})

database.get('/movie/:id', checkID, returnMovieByID, (req, res, next) => {
    res.status(200).send(`Sorry, we're having trouble locating the current title`);
})

database.get('/find', checkTitle, returnMovieByTitle, (req, res, next) => { //will be used to handle query params
    res.status(200).send(`We'll find some movies for ya`);
})

database.post('/movie', addMovie, (req, res, next) => {
    res.status(201).send('Posted!');
})

module.exports = database; 