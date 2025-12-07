import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import MovieCard from "../components/movieCard"; 
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const PlaylistPage = () => {
  const { playlist, removeFromPlaylist } = useContext(MoviesContext);

  if (!playlist || playlist.length === 0) {
    return <h2>Your playlist is empty.</h2>;
  }

  return (
    <PageTemplate
      title="My Playlist"
      movies={playlist}
      action={(movie) => (
        <IconButton onClick={() => removeFromPlaylist(movie)}>
          <DeleteIcon color="error" />
        </IconButton>
      )}
    />
  );
};

export default PlaylistPage;
