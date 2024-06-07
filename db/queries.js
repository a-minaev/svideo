const Movie = require('./init');

const findMovie = async(req, res, next) => {
  const movie = await Movie.findAll({
    where: {
      title: req.title
    }
  });
  next();
};
