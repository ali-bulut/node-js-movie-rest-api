const Movie = require("../models/movie-model");
const Admin = require("../models/admin-model");

const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return next(new Error("Fetching movies failed!"));
  }

  if(!movies){
    return next(new Error("Could not find any movies!"));
  }

  res.json({movies: movies.map(movie => movie.toObject({getters:true}))});
};

const addMovie = async (req,res,next) => {
    const {name, downloadUrl, imageUrl, creator} = req.body;

    const createdMovie = new Movie({
        name,
        downloadUrl,
        imageUrl,
        creator
    });
    try {
        await createdMovie.save();
    } catch (err) {
        return next(new Error('Adding movie failed!'))
    }

    res.status(201).json({movie:createdMovie});
}

const updateMovie = async (req,res,next) => {
    const {name, downloadUrl, imageUrl} = req.body;
    const movieId = req.params.movieId;

    let movie;
    try {
        movie = await Movie.findById(movieId);
    } catch (err) {
        const error = new Error(
            "Something went wrong, could not find a movie!"
          );
          return next(error);
    }

    if(!movie){
        return next(new Error(
            "Something went wrong, could not find a movie!"));
    }

    movie.name=name;
    movie.downloadUrl=downloadUrl;
    movie.imageUrl=imageUrl;

    try {
        await movie.save();
    } catch (err) {
        const error = new Error(
            "Updating movie failed, please try again!"
          );
          return next(error);
    }

    res.status(200).json({movie:movie.toObject({getters:true})})
}

const deleteMovie = async (req,res,next) => {
    const movieId = req.params.movieId;

    let movie;
    try {
        movie = await Movie.findById(movieId);
    } catch (err) {
        const error = new Error(
            "Something went wrong, could not find a movie!"
          );
          return next(error);
    }

    if(!movie){
        return next(new Error(
            "Something went wrong, could not find a movie!"));
    }

    try {
        await movie.remove();
    } catch (err) {
        const error = new Error(
            "Deleting movie failed, please try again!"
          );
          return next(error);
    }

    res.json({message :'The Movie has been deleted!'});
}


exports.getMovies=getMovies;
exports.addMovie=addMovie;
exports.updateMovie=updateMovie;
exports.deleteMovie = deleteMovie;