import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites'
import { getTrendingToday } from "../api/tmdb-api";

const trendingTodayPage = () => {
 const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: getTrendingToday,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

     return (
  <PageTemplate
    title="Trending Today"
    movies={movies}
    action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
);

   
}
export default trendingTodayPage;