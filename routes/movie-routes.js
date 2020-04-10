const express = require("express");
const {getMovies, getMoviesByAdminId, addMovie, updateMovie, deleteMovie} = require('../controllers/movie-controller');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();


router.get('/', getMovies);

router.get('/admin/:adminId', getMoviesByAdminId);

router.use(checkAuth);

router.post('/', addMovie);

router.patch('/:movieId', updateMovie);

router.delete('/:movieId', deleteMovie);

module.exports=router;