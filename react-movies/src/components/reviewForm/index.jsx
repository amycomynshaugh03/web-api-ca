import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button, TextField, MenuItem, Typography, Box, Snackbar, Alert } from "@mui/material";

const ReviewForm = ({ movie }) => {
  const queryClient = useQueryClient();
  const context = useContext(MoviesContext);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(3);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { author: "", review: "", rating: "3" }
  });

  const onSubmit = async (formData) => {
    const reviewPayload = {
      movieId: movie.id,
      review: formData.review,
      rating: rating,
    };

    if (authToken) {
      await context.addReview(movie, reviewPayload);
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      setOpen(true);
    }
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/reviews/my-reviews");
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h3">Write a review</Typography>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>Review Submitted Successfully!</Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth multiline minRows={10} label="Review text" margin="normal" variant="outlined" />
          )}
        />
        <TextField
          select
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          margin="normal"
        >
          {[5, 4, 3, 2, 1].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
        </TextField>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;