const Movie = require('./init');

const findMovie = async(req, res, next) => {
  const req.title = req.query.title;
  const req.director = req.query.director;
  const req.year = req.query.year;

  switch(true) {
      
      case(req.title && req.director && req.year):
        const movie = await Movie.findAll({
          where: {
            title: req.title,
            director: req.director,
            year: req.year
          }
        });

      case(req.title && req.director):
        const movie = await Movie.findAll({
          where: {
            title : req.title,
            director : req.director
          }
        });

      case(req.title && req.year):
        const movie = await Movie.findAll({
          where: {
            title: req.title,
            year: req.year
          }
        });

      case(req.director && req.year):
        const movie = await Movie.findAll({
          where: {
            director: req.director,
            year: req.year
          }
        });

      case(req.title):
        const movie = await Movie.findAll({
          where: {
            title: req.title
          }
        });

      case(req.director):
        const movie = await Movie.findAll({
          where: {
            director: req.director
          }
        });

      case(req.year):
        const movie = await Movie.findAll({
          where: {
            year: req.year
          }
        });

    default:
        const movie = await Movie.findAll({
          
        });
  }

  next();
};

// reduntant; can create three variables and execute as neededin findMovie
const checkQueryParams = (req, res, next) => {
  switch(true) {
      case(req.query.title 
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
