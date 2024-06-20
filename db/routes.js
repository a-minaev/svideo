import express from 'express';
import { findMovies, addMovie } from './queries.js';
const db = express.Router();

db.param('id', (req, res, next, id) => {
  const movieID = id;
  req.id = movieID;
  next();
});

db.get('/movies', findMovies, (req, res, next) => {
  res.status(200).send(res.movie);
});

db.get('/movies/:id', findMovies, (req, res, next) => {
  res.status(200).send("Here's your specific movie");
});

db.post('/movies', addMovie, (req, res, next) => {
  res.status(201).send("Your movie has been added");
});

export { db };