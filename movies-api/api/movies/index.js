import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getMovie, getGenres,getMovieImages,getMovieReviews, getUpcomingMovies, getTrendingToday, getPopularMovies, getTopRatedMovies,getNowPlayingMovies, getMovieCredits, getMovieVideos, getPersonDetails, getPersonMovieCredits, getSimilarMovies } from '../tmdb-api'; 


const router = express.Router();

router.get("/discover", asyncHandler(async (req, res) => {
  res.json(await getMovies());
}));

router.get("/genres", asyncHandler(async (req, res) => {
  res.json(await getGenres());
}));

router.get("/upcoming", asyncHandler(async (req, res) => {
  res.json(await getUpcomingMovies());
}));

router.get("/trending/today", asyncHandler(async (req, res) => {
  res.json(await getTrendingToday());
}));

router.get("/popular", asyncHandler(async (req, res) => {
  res.json(await getPopularMovies());
}));

router.get("/top-rated", asyncHandler(async (req, res) => {
  res.json(await getTopRatedMovies());
}));

router.get("/now-playing", asyncHandler(async (req, res) => {
  res.json(await getNowPlayingMovies());
}));

router.get("/person/:id", asyncHandler(async (req, res) => {
  res.json(await getPersonDetails(req.params.id));
}));

router.get("/person/:id/credits", asyncHandler(async (req, res) => {
  res.json(await getPersonMovieCredits(req.params.id));
}));

router.get("/:id", asyncHandler(async (req, res) => {
  res.json(await getMovie(req.params.id));
}));

router.get("/:id/reviews", asyncHandler(async (req, res) => {
  res.json(await getMovieReviews(req.params.id));
}));

router.get("/:id/credits", asyncHandler(async (req, res) => {
  res.json(await getMovieCredits(req.params.id));
}));

router.get("/:id/videos", asyncHandler(async (req, res) => {
  res.json(await getMovieVideos(req.params.id));
}));

router.get("/:id/images", asyncHandler(async (req, res) => {
  res.json(await getMovieImages(req.params.id));
}));

router.get("/:id/similar", asyncHandler(async (req, res) => {
  res.json(await getSimilarMovies(req.params.id));
}));

export default router;