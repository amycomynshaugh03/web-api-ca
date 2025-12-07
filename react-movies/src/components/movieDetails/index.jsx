import React, { useState } from "react";
import { Paper, Chip, Typography, Fab, Drawer } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import LanguageIcon from "@mui/icons-material/Language";
import MovieReviews from "../movieReviews";
import MovieCredits from "../movieCredits";
import MovieVideos from "../movieVideos";
import SimilarMovies from "../similarMovies";

const MovieDetails = ({ movie }) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const chipStyle = { borderRadius: 16, m: 0.5, fontWeight: 500 };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
      <Typography variant="h5" sx={{ mb: 1 }}>Overview</Typography>
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>{movie.overview}</Typography>

      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", p: 2, m: 0, gap: 0.5, mb: 2 }}>
        <Chip label="Genres" color="primary" sx={chipStyle} />
        {movie.genres.map((g) => <Chip key={g.name} label={g.name} sx={{ ...chipStyle, backgroundColor: '#e3f2fd' }} />)}
      </Paper>

      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", p: 2, m: 0, gap: 0.5, mb: 2 }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={chipStyle} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} sx={chipStyle} />
        <Chip icon={<StarRate />} label={`${movie.vote_average.toFixed(1)} (${movie.vote_count})`} sx={chipStyle} />
        <Chip label={`Released: ${movie.release_date}`} sx={chipStyle} />
        <Chip icon={<LanguageIcon />} label={`Original Language: ${movie.original_language.toUpperCase()}`} sx={chipStyle} />
      </Paper>

      <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", listStyle: "none", p: 2, m: 0, gap: 0.5, mb: 2 }}>
        <Chip label="Production Countries" color="default" sx={chipStyle} />
        {movie.production_countries.map((c) => <Chip key={c.name} label={c.name} sx={{ ...chipStyle, backgroundColor: '#e0f7fa' }} />)}
      </Paper>

      <SimilarMovies movieId={movie.id} />
      <MovieVideos movieId={movie.id} />

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setReviewsOpen(true)}
        sx={{ position: 'fixed', bottom: '1em', right: '1em', background: 'linear-gradient(45deg, #42a5f5, #64b5f6)', color: 'white', "&:hover": { transform: "scale(1.1)", boxShadow: '0px 4px 12px rgba(0,0,0,0.3)' } }}
      >
        <NavigationIcon sx={{ mr: 1 }} /> Reviews
      </Fab>

      <Fab
        color="primary"
        variant="extended"
        onClick={() => setCreditsOpen(true)}
        sx={{ position: "fixed", bottom: "5em", right: "1em", background: 'linear-gradient(45deg, #90caf9, #64b5f6)', color: 'white', "&:hover": { transform: "scale(1.1)", boxShadow: '0px 4px 12px rgba(0,0,0,0.3)' } }}
      >
        <NavigationIcon sx={{ mr: 1 }} /> Credits
      </Fab>

      <Drawer anchor="top" open={reviewsOpen} onClose={() => setReviewsOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      <Drawer anchor="top" open={creditsOpen} onClose={() => setCreditsOpen(false)}>
        <MovieCredits movieId={movie.id} />
      </Drawer>
    </div>
  );
};

export default MovieDetails;
