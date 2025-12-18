import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import MovieCard from "../components/movieCard"; 
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const PlaylistPage = () => {
  const { playlist: movieIds, removeFromPlaylist } = useContext(MoviesContext);

  const playlistMovieQueries = useQueries({
    queries: (movieIds || []).map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

const isLoading = playlistMovieQueries.some((m) => m.isLoading);

if (isLoading) {
    return <Spinner />;
  }

 const movies = playlistMovieQueries
    .filter((q) => q.data)
    .map((q) => {
      if (q.data.genres) {
        q.data.genre_ids = q.data.genres.map((g) => g.id);
      }
      return q.data;
    });

  if (movies.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your playlist is empty.</h2>
      </div>
    );
  }

  return (
    <PageTemplate
      title="My Playlist"
      movies={movies}
      action={(movie) => (
        <IconButton 
          aria-label="remove from playlist" 
          onClick={() => removeFromPlaylist(movie)}
        >
          <DeleteIcon color="error" fontSize="large" />
        </IconButton>
      )}
    />
  );
};

export default PlaylistPage;
