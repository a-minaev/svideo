const express = require('express');
const database = express.Router();

database.get('/movies', (req, res, next) => {
    res.status(200).send('Movie List is in development, check back soon!');
})

database.get('/movie/:id', (req, res, next) => {
    res.status(200).send(`Sorry, we're having trouble locating the current title`);
})

database.post('/movie', (req, res, next) => {
    res.status(201).send('Posted!');
})

module.exports = database; 