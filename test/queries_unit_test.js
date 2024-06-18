import { findMovie, addMovie } from '../db/queries.js';

let req = {
    query: {
        title: undefined,
        director:'Tarantino',
        year: undefined
    }
};

let res = {};

findMovie(req);