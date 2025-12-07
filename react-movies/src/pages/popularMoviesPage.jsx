import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites';
import { getPopularMovies } from "../api/tmdb-api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PopularMoviesPage = () => { 
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopularMovies,
  });

  const [page, setPage] = useState(1);
  const moviesPerPage = 10;

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data || [];
  const pageCount = Math.ceil(movies.length / moviesPerPage);
  const currentPage = Math.min(page, pageCount);

  const displayedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handleChange = (event, value) => setPage(value);

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={displayedMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
      {pageCount > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
};

export default PopularMoviesPage;
