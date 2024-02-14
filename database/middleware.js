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
    const movieTitles = [];
    movieList.forEach((movie) => movieTitles.push(movie.title));
    console.log(movieTitles);
}

returnMovies(20, 20, 20);
const returnMovie = (req, res, next) => {
    const title = checkTitle();
    if(checkTitle(req.body.title)) { //Verify that movie title is passed in req body
        const returnMovie = getMovieDetails(req.body.title);
        res.status(200).send(returnMovie);
    }
}

//POST Middleware



//PUT Middleware


//Helpers
const checkTitle = (title) => {
    console.log('!!Running checkTitle()!!');
    var validTitle = false;
    const movieIsInList = movieList.forEach((movie) => {if(movie.title == title) {
        validTitle = true; 
    }});
    if(validTitle){
        return validTitle;

    } else {
        throw error = new Error('Not a valid Title');
    }
};

const getMovieID = (title) => {
    
}
const getMovieDetails = (title) => {
    const returnMovie = movieList.forEach((movie) => {
        if(movie.title == title) {
            return movie;
        }
    })
    return returnMovie;
};


console.log(checkTitle('Killers of the Flower Moon'));