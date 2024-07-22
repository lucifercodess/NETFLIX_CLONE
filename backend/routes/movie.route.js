import express from "express";
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovies } from "../controllers/movie.controller.js";
const router = express.Router();

router.get('/trending-movies',getTrendingMovies) // trending movie route
router.get("/:id/trailers",getMovieTrailers) // trailers route
router.get("/:id/details",getMovieDetails) // detaild of the movie route
router.get("/:id/similar",getSimilarMovies) // similar movies route
router.get("/:category",getMoviesByCategory) // category route

export default router;