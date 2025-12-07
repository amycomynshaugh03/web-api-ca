import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const moviesPerPage = 10;

  const { addToMustWatch } = useContext(MoviesContext);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  const handleAddToPlayList = (movie) => (
    <IconButton onClick={() => addToMustWatch(movie)}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const displayedMovies = movies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={handleAddToPlayList}
        showPlaylistButton={false}
      />
      {pageCount > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
};

export default UpcomingMoviesPage;
