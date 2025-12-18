import React, { useState, useContext, useEffect, useCallback } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api/movies-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {

  const { authToken } = useContext(AuthContext); 
  
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const fetchFavorites = useCallback(async () => {
    if (!authToken) return;
    try {
      const data = await getFavorites(authToken);
      setFavorites(data || []);
    } catch (e) {
      console.error("Fetch Favorites Error:", e);
    }
  }, [authToken]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  

  const addToFavorites = async (movie) => {
  if (!authToken) return;
  try {
    const updatedFavorites = await addFavorite(movie.id, authToken);
    setFavorites(updatedFavorites); 
  } catch (e) {
    console.error("Failed to add favorite", e);
  }
};

  const removeFromFavorites = async (movie) => {
    if (!authToken) return;
    await removeFavorite(movie.id, authToken);
    setFavorites(favorites.filter((mId) => mId !== movie.id)); 
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToMustWatch = (movie) => {
    setMustWatch([...mustWatch, movie.id]);
  };

  const addToPlaylist = (movie) => {
    if (!playlist.find((m) => m.id === movie.id)) setPlaylist([...playlist, movie]);
  };
  const removeFromPlaylist = (movie) => {
    setPlaylist(playlist.filter((m) => m.id !== movie.id));
  };


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        fetchFavorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;