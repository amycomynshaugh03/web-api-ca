import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../api/movies-api";
import { AuthContext } from "../contexts/authContext";
import Spinner from "../components/spinner";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const MyReviewsPage = () => {
  const { authToken } = useContext(AuthContext);

  const { data: reviews, isLoading, isError, error } = useQuery({
    queryKey: ["myReviews", authToken],
    queryFn: () => getMyReviews(authToken),
    enabled: !!authToken,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography variant="h3" gutterBottom>My Reviews</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Movie ID</TableCell>
              <TableCell align="left">Review</TableCell>
              <TableCell align="right">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews && reviews.length > 0 ? (
              reviews.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.movieId}</TableCell>
                  <TableCell align="left">{r.review}</TableCell>
                  <TableCell align="right">{r.rating}/5</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">No reviews found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyReviewsPage;