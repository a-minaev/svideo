const Movie = require('./init');

const findMovie = async(req, res, next) => {
  const req.title = req.query.title;
  const req.director = req.query.director;
  const req.year = req.query.year;

  switch(true) {
      
      case(typeof(req.title && req.director && req.year) == 'string'):
        const movie = await Movie.findAll({
          where: {
            title: req.title,
            director: req.director,
            year: req.year
          }
        });
        break;

      case(typeof(req.title && req.director)) == 'string':
        const movie = await Movie.findAll({
          where: {
            title : req.title,
            director : req.director
          }
        });
        break;

      case(typeof(req.title && req.year)):
        const movie = await Movie.findAll({
          where: {
            title: req.title,
            year: req.year
          }
        });
        break;

      case(typeof(req.director && req.year)):
        const movie = await Movie.findAll({
          where: {
            director: req.director,
            year: req.year
          }
        });
        break;

      case(typeof(req.title) == 'string'):
        const movie = await Movie.findAll({
          where: {
            title: req.title
          }
        });
        break;

      case(typeof(req.director)) == 'string':
        const movie = await Movie.findAll({
          where: {
            director: req.director
          }
        });
        break;

      case(typeof(req.year)) == 'string':
        const movie = await Movie.findAll({
          where: {
            year: req.year
          }
        });
        break;

    default:
        const movie = await Movie.findAll({
          
        });
  }

  next();
};
const addMovie = async(req, res, next) => {
    const req.id = makeID(); // 
    const req.title = req.query.title;
    const req.director = req.query.director;
    const req.year = req.query.year;

    const movie = await Movie.create({
        id: req.id,
        title : req.title,
        director : req. director,
        year: req.year;
    })
    console.log(`Successfully created the movie: ${movie.title}`)
    next();
}
// reduntant; can create three variables and execute as neededin findMovie
const checkQueryParams = (req, res, next) => {
  switch(true) {
      case(req.query.title):
  }
};

// sanitize queries
const sanitizeQuery = (input) => {
  return new Promise((resolve, reject) => {
    // verify is string, alphanumeric
    // some titles contain special characters like ' : ; / 
    if(true){
      resolve(input);
    } else {
      reject('failed one of the criteria');
    }
  });
};

const makeID = async () => {
    const lastMovieID = await Movie.findAll({
        attributes: ['id'],
        order: ['id', 'DESC']
    })

    console.log(lastMovieID); 
    return(); //return lastID incremented by 1
}
module.exports = { findMovie, addMovie };
