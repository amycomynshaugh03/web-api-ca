import fetch from "node-fetch";

const API_KEY = process.env.TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const req = async (url) => {
  const res = await fetch(`${BASE_URL}${url}&api_key=${API_KEY}`);
  return res.json();
};

export const getMovies = () =>
  req("/discover/movie?language=en-US&sort_by=popularity.desc");

export const getMovie = (id) =>
  req(`/movie/${id}?language=en-US`);

export const getGenres = () =>
  req("/genre/movie/list?language=en-US");

export const getMovieReviews = (id) =>
  req(`/movie/${id}/reviews?language=en-US`);

export const getUpcomingMovies = () =>
  req("/movie/upcoming?language=en-US");

export const getTrendingToday = () =>
  req("/trending/movie/day?language=en-US");

export const getPopularMovies = () =>
  req("/movie/popular?language=en-US");

export const getTopRatedMovies = () =>
  req("/movie/top_rated?language=en-US");

export const getNowPlayingMovies = () =>
  req("/movie/now_playing?language=en-US");

export const getMovieCredits = (id) =>
  req(`/movie/${id}/credits?language=en-US`);

export const getMovieVideos = (id) =>
  req(`/movie/${id}/videos?language=en-US`);

export const getMovieImages = (id) =>
  req(`/movie/${id}/images?`);

export const getPersonDetails = (id) =>
  req(`/person/${id}?language=en-US`);

export const getPersonMovieCredits = (id) =>
  req(`/person/${id}/movie_credits?language=en-US`);

export const getSimilarMovies = (id) =>
  req(`/movie/${id}/similar?language=en-US`);
