import React, { useState, useContext, useEffect, useCallback } from "react";
import { getFavorites, addFavorite, removeFavorite , getPlaylist, addPlaylist, removePlaylist} from "../api/movies-api";
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

  const fetchPlaylist = useCallback(async () => {
    if (!authToken) return;
    const data = await getPlaylist(authToken);
    setPlaylist(data || []);
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchPlaylist();
      fetchFavorites(); 
    }
  }, [authToken, fetchPlaylist]);
  

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

  const addToPlaylist = async (movie) => {
    if (!authToken) return;
    const updatedPlaylist = await addPlaylist(movie.id, authToken);
    setPlaylist(updatedPlaylist);
  };
  
  const removeFromPlaylist = async (movie) => {
    if (!authToken) return;
    const updatedPlaylist = await removePlaylist(movie.id, authToken);
    setPlaylist(updatedPlaylist);
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