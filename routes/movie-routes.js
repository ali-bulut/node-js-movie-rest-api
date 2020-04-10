const express = require("express");
const {getMovies, addMovie, updateMovie, deleteMovie} = require('../controllers/movie-controller');

const router = express.Router();

router.get('/', getMovies);

router.post('/', addMovie);

router.patch('/:movieId', updateMovie);

router.delete('/:movieId', deleteMovie);

module.exports=router;