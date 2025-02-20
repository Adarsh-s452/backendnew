import express from 'express';
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/addmovies', upload, addMovie);
router.get('/getallmovies', getMovies);
router.get('/getmoviesbyid/:id', getMovieById);
router.put('/update/:id', upload, updateMovie);
router.delete('/:id', deleteMovie);

export default router;
