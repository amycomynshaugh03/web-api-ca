import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds, fetchFavorites } = useContext(MoviesContext);

  useEffect(() => {
    fetchFavorites(); 
  }, []);

  const favoriteMovieQueries = useQueries({
    queries: (movieIds || []).map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie
    }))
  });

  const isLoading = favoriteMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const favoriteMovies = favoriteMovieQueries
    .filter((q) => q.data)
    .map((q) => {
      if (q.data.genres) {
        q.data.genre_ids = q.data.genres.map((g) => g.id);
      }
      return q.data;
    });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favoriteMovies}
      action={(movie) => (
        <>
          <RemoveFromFavourites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
      showPlaylistButton={false}
    />
  );
};

export default FavoriteMoviesPage;