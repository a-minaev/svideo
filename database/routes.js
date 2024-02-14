const express = require('express');
const database = express.Router();

database.param('id', (req, res, next, id) => {
    const movieID = id;
    // check for id in list

    req.movieID = movieID;
    next();

})


database.get('/movies', (req, res, next) => { //will use returnMovies
    res.status(200).send('Movie List is in development, check back soon!');
})

database.get('/movie/:id', (req, res, next) => {
    res.status(200).send(`Sorry, we're having trouble locating the current title`);
})

database.get('/find', (req, res, next) => { //will be used to handle query params
    res.status(200).send(`We'll find some movies for ya`);
})

database.post('/movie', (req, res, next) => {
    res.status(201).send('Posted!');
})

module.exports = database; 