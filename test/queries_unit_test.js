import { findMovie, addMovie } from '../db/queries.js';

let req = {
    query: {
        title: undefined,
        director:undefined,
        year:'2014'
    }
};

let res = {};

findMovie(req);