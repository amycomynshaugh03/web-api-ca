import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MovieVideos = ({ movieId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", { id: movieId }],
    queryFn: getMovieVideos,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const videos = data.results.filter((v) => v.site === "YouTube");
  if (!videos.length) return <Typography variant="h6" sx={{ mt: 2 }}>No videos available for this movie.</Typography>;

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, mb: 2 }}>
        Official Videos
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
        {videos.map((video) => (
          <Box 
            key={video.id} 
            sx={{ 
              boxShadow: 3, 
              borderRadius: 2, 
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 }
            }}
          >
            <iframe
              width="360"
              height="200"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              style={{ display: "block", border: 0 }}
              allowFullScreen
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MovieVideos;
