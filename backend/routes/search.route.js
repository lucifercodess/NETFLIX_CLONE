import express from "express";
import { removeItemFromSearchHistory, searchHistory, searchMovie, searchPerson, searchTvShow } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tvShow/:query",searchTvShow);

router.get('/history',searchHistory);
router.delete('/history/:id',removeItemFromSearchHistory);

export default router;