import { Movie } from './init.js';
import { Op } from 'sequelize';

const findMovies = async(req, res, next) => {
  let movie = undefined;
  req.title = req.query.title;
  req.director = req.query.director;
  req.year = req.query.year;

  switch(true) {
      
      case(typeof(req.title && req.director && req.year) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: {[Op.substring]: req.title},
            director: {[Op.substring]: req.director},
            year: req.year
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.title && req.director)) == 'string':
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title : {[Op.substring]: req.title},
            director : {[Op.substring]: req.director}
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.title && req.year)):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: {[Op.substring]: req.title},
            year: req.year
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.director && req.year)):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            director: {[Op.substring]: req.director},
            year: req.year
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.title) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            title: {[Op.substring]: req.title}
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.director) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            director: {[Op.substring]: req.director}
          },
          order: [['year', 'DESC']]
        });
        break;

      case(typeof(req.year) == 'string'):
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          where: {
            year: req.year
          },
          order: [['year', 'DESC']]
        });
        break;

    default:
        movie = await Movie.findAll({
          attributes: {exclude: ['createdAt', 'updatedAt']},
          order: [['year', 'DESC']]
        });
  }

  res.movie = movie.map((obj)=>obj.dataValues);
  res.movie.forEach(movie => {console.log(movie.title, movie.year, movie.genre)});
  console.log(res.movie);
  //next();
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

export{ findMovies, addMovie };
