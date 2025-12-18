import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyReviews, deleteReview, updateReview } from "../api/movies-api";
import { AuthContext } from "../contexts/authContext";
import Spinner from "../components/spinner";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MyReviewsPage = () => {
  const { authToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editReview, setEditReview] = useState(null);
  const [newText, setNewText] = useState("");

  const { data: reviews, isLoading, isError, error } = useQuery({
    queryKey: ["myReviews", authToken],
    queryFn: () => getMyReviews(authToken),
    enabled: !!authToken,
  });

  const handleDelete = async (reviewId) => {
    if (window.confirm("Delete review?")) {
      await deleteReview(reviewId, authToken);
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    }
  };

  const handleEditOpen = (review) => {
    setEditReview(review);
    setNewText(review.review);
  };

  const handleUpdate = async () => {
    await updateReview(editReview._id, { review: newText }, authToken);
    setEditReview(null);
    queryClient.invalidateQueries({ queryKey: ["myReviews"] });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h3" gutterBottom>My Reviews</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Movie ID</TableCell>
              <TableCell>Review</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews?.map((r) => (
              <TableRow key={r._id}>
                <TableCell>{r.movieId}</TableCell>
                <TableCell>{r.review}</TableCell>
                <TableCell align="right">{r.rating}/5</TableCell>
                <TableCell align="center">
                  <Button startIcon={<EditIcon />} onClick={() => handleEditOpen(r)}>Edit</Button>
                  <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(r._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(editReview)} onClose={() => setEditReview(null)}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditReview(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyReviewsPage;