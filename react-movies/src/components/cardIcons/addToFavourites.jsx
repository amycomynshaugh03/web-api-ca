import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Snackbar, Alert } from "@mui/material";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
    setOpenSnackbar(true);
  };

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Added to Favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavoritesIcon;
