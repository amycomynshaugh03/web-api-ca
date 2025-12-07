import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HomePage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  });

  const [page, setPage] = useState(1);
  const moviesPerPage = 10;

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results || [];
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
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
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

export default HomePage;
