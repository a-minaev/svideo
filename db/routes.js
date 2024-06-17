import express from 'express';
const db = express.Router();

db.param('id', (req, res, next, id) => {
  const movieID = id;
  req.id = movieID;
  next();
});

db.get('/movies', (req, res, next) => {
  res.status(200).send("Here's your movies");
});

db.get('/movies/:id', (req, res, next) => {
  res.status(200).send("Here's your specific movie");
});

db.post('/movies', (req, res, next) => {
  res.status(201).send("Your movie has been added");
});

export { db };