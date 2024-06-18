import { Movie } from './init.js';

const findMovie = async(req, res, next) => {
  let movie = undefined;
  req.title = req.query.title;
  req.director = req.query.director;
  req.year = req.query.year;

  switch(true) {
      
      case(typeof(req.title && req.director && req.year) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: req.title,
            director: req.director,
            year: req.year
          }
        });
        break;

      case(typeof(req.title && req.director)) == 'string':
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title : req.title,
            director : req.director
          }
        });
        break;

      case(typeof(req.title && req.year)):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: req.title,
            year: req.year
          }
        });
        break;

      case(typeof(req.director && req.year)):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            director: req.director,
            year: req.year
          }
        });
        break;

      case(typeof(req.title) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: req.title
          }
        });
        break;

      case(typeof(req.director) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            director: req.director
          }
        });
        break;

      case(typeof(req.year) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            year: req.year
          }
        });
        break;

    default:
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          
        });
  }

  movie.forEach(movie => {console.log(movie.get('title'))});
  next();
};
const addMovie = async(req, res, next) => {
    req.id = makeID(); // 
    req.title = req.query.title;
    req.director = req.query.director;
    req.year = req.query.year;

    let movie = await Movie.create({
        id: req.id,
        title : req.title,
        director : req. director,
        year: req.year
    })
    console.log(`Successfully created the movie: ${movie.title}`)
    next();
}

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
        order: [['id', 'DESC']]
    })

    console.log(lastMovieID); 
    return; //return lastID incremented by 1
}

// makeID();

export{ findMovie, addMovie };
