const BASE_URL = "http://localhost:8080/api/movies";

export const getMovies = async () =>
  fetch(`${BASE_URL}/discover`).then(r => r.json());

export const getMovie = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/${id}`).then(r => r.json());
};

export const getGenres = async () =>
  fetch(`${BASE_URL}/genres`).then(r => r.json());

export const getMovieReviews = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  const data = await fetch(`${BASE_URL}/${id}/reviews`).then(r => r.json());
  return data.results || [];
};

export const getUpcomingMovies = async () =>
  fetch(`${BASE_URL}/upcoming`).then(r => r.json()).then(data => data.results);

export const getTrendingToday = async () =>
  fetch(`${BASE_URL}/trending/today`).then(r => r.json());

export const getPopularMovies = async () =>
  fetch(`${BASE_URL}/popular`).then(r => r.json()).then(data => data.results);

export const getTopRatedMovies = async () =>
  fetch(`${BASE_URL}/top-rated`).then(r => r.json()).then(data => data.results);

export const getNowPlayingMovies = async () =>
  fetch(`${BASE_URL}/now-playing`).then(r => r.json()).then(data => data.results);

export const getMovieCredits = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/${id}/credits`).then(r => r.json());
};

export const getMovieVideos = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/${id}/videos`).then(r => r.json());
};

export const getMovieImages = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/${id}/images`).then(r => r.json());
};

export const getPersonDetails = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/person/${id}`).then(r => r.json());
};

export const getPersonMovieCredits = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  return fetch(`${BASE_URL}/person/${id}/credits`).then(r => r.json());
};

export const getSimilarMovies = async (arg) => {
  const id = arg?.queryKey ? arg.queryKey[1].id : arg.id || arg;
  const data = await fetch(`${BASE_URL}/${id}/similar`).then(r => r.json());
  return data.results || [];
};

