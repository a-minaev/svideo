import { findMovies, addMovie } from '../db/queries.js';

let req = {
    query: {
        title: undefined,
        director:'Tarantino',
        year: undefined
    }
};

let res = {};

findMovies(req, res);