const Movie = class {
    title;
    director;
    year;
    watchStatus;
    rating;

    constructor(title, director, year){
        this.title = title;
        this.director = director;
        this.year = year;
    } 

    setWatchStatus(bool){
        this.watchStatus = bool;
    }
    setRating(int){
        this.rating;
    } 
    get details(){
        console.log(`${this.title}, released on ${this.year}, was directed by ${this.director}`);
        if(this.watchStatus){
            console.log("You've watched this film before!");
        } else {
            console.log("You've yet to see this film");
        }
    }
};

const movieList = [];
const killers = new Movie('Killers of the Flower Moon', 'Martin Scorsese', 2023);
const zilla = new Movie('Godzilla Minus One', 'Takashi Yamazaki', 2023);
const opp = new Movie('Oppenheimer', 'Christopher Nolan', 2023);
const barbie = new Movie('Barbie', 'Greta Gerwig', 2023);
const zone = new Movie('The Zone of Interest', 'Jonathan Glazer', 2024);
const things = new Movie('Poor Things', 'Yorgos Lanthimos', 2023);

killers.details;

killers.setWatchStatus(true);
killers.details;


const addToList = (movie) => {
    movieList.push(movie);
}

addToList(killers);
addToList(zilla);
addToList(opp);
addToList(barbie);
addToList(zone);
addToList(things);

console.log(movieList);

//GET Middleware
const returnMovies = (req, res, next) => {
    var movieTitles = [];

    switch(true){
        case(!req.hasTitle && !req.hasDirector && !req.hasYear):
            console.log('Return top 10 movies');
            res.status(200).send(movieList);
            break;

        case(req.hasTitle && req.hasYear):
            console.log('parse by year and title');

            movieTitles = parseListByTitle(parseListByYear(movieList,req.query.year), req.query.title);
            res.status(200).send(movieTitles);
            break;

        case(req.hasYear && req.hasDirector):
            console.log('parse by director and year');

            movieTitles = parseListByYear(parseListByDirector(movieList, req.query.director), req.query.year);
            res.status(200).send(movieTitles);
            break;

        case(req.hasTitle && req.hasDirector):
            console.log('parse by director and year');

            movieTitles = parseListByTitle(parseListByDirector(movieList, req.query.director), req.query.title);
            res.status(200).send(movieTitles);
            break;

        case(req.hasDirector):
            console.log('parse by director');

            movieTitles = parseListByDirector(movieList, req.query.director);
            res.status(200).send(movieTitles);
            break;

        case(req.hasYear):
            console.log('parse by year');

            movieTitles = parseListByYear(movieList, req.query.year);
            res.status(200).send(movieTitles);
            break;

        default:
            console.log('parsing by title');

            movieTitles = parseListByTitle(movieList, req.query.title);
            res.status(200).send(movieTitles);
    }
}

const returnMovieByTitle = (req, res, next) => {
    const returnMovie = parseListByTitle(req.body.title);
    res.status(200).send(returnMovie);
}

const returnMovieByID = (req, res, next) => {
    res.status(200).send(movieList[req.id]);
}

//POST Middleware
const addMovie = (req,res,next) => {
    console.log(req.body.title);
    if(req.body.title && req.body.director && req.body.year) {
        const movie = new Movie(req.body.title, req.body.director, req.body.year);
        addToList(movie);
        res.status(201).send(`The film ${req.body.title} has been posted`);
    } else {
        const error = new Error('Not all needed fields are specified');
        next(error);
    }
}


//PUT Middleware


//Helpers

const checkID = (req, res, next) => {
    console.log(movieList[req.id])
    if(movieList[req.id]){
        next();
    } else {
        const error = new Error('Provided ID is not in list');
        next(error);
    }
}

const checkQueryParams = (req, res, next) => {
    switch(true){
        case (typeof(req.query.title)=='string' && 
              typeof(req.query.director)=='string' &&
              typeof(req.query.year)=='string'):
            
            req.hasTitle = true;
            req.hasDirector = true;
            req.hasYear = true;

            console.log(`The following query params were specified: ${req.query.title}, ${req.query.director}, and ${req.query.year}`);
            break;
        case !req.query.title && !req.query.year:
            req.hasDirector = true;

            console.log(`Fetching movies directed by ${req.query.director}`);
            break;
        case !req.query.title && !req.query.director:
            req.hasYear = true;

            console.log(`Fetching movies released in ${req.query.year}`);
            break;
        case !req.query.title:
            req.hasDirector = true;
            req.hasYear = true;

            console.log(`Fetching movies by ${req.query.director} released in ${req.query.year}`);
            break;
        case (typeof req.query.title == "string"):
            req.hasTitle = true;
            
            console.log(`Fetching movies containing by ${req.query.title}`);
            break;
        default:
            console.log('Fetching the Top Ten Rated Movies');
    }
    next();
}


const parseListByTitle = (listToParse, title) => {
    var returnMovie = {};
    const returnList = [];

    listToParse.forEach((movie) => {
        if(movie.title == title) {
            returnMovie = movie;
            returnList.push(returnMovie);
        }
    })
    return returnList;
};
const parseListByDirector = (listToParse, director) => {
    var returnMovie = {};
    const returnList = [];

    listToParse.forEach((movie) => {
        if(movie.director == director) {
            returnMovie = movie;
            returnList.push(returnMovie);
        }
    })
    return returnList;
};

const parseListByYear = (listToParse, year) => {
    var returnMovie = {};
    const returnList = [];

    listToParse.forEach((movie) => {
        if(movie.year == year) {
            returnMovie = movie;
            returnList.push(returnMovie);
        }
    })
    return returnList;
};




/*
console.log(checkTitle('Killers of the Flower Moon'));
console.log(checkTitle('TMNT'));
*/

module.exports = {
    returnMovies, 
    returnMovieByTitle,
    returnMovieByID,
    checkID,
    addMovie,
    checkQueryParams
};