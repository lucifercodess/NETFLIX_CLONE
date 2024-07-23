import express from "express";
import {
  getSimilarTvShow,
  getTrendingTvShows,
  getTvShowByCategory,
  getTvShowDetails,
  getTvShowTrailers,
} from "../controllers/tvShow.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTvShows); // trending tv show route
router.get("/:id/trailers", getTvShowTrailers); // trailers route
router.get("/:id/details", getTvShowDetails); // detaild of the tv show route
router.get("/:id/similar", getSimilarTvShow); // similar tv show  route
router.get("/:category", getTvShowByCategory); // category route

export default router;
