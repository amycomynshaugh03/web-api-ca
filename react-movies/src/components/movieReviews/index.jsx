import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

export default function MovieReviews({ movie }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movie.id).then(setReviews);
  }, [movie.id]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2, maxWidth: "95%", m: "1rem auto" }}>
      <Table sx={{ minWidth: 550, fontFamily: "'Roboto', sans-serif" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>Author</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2" }}>Excerpt</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", color: "#1976d2" }}>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id} sx={{ "&:hover": { backgroundColor: "#f0f8ff", transform: "scale(1.01)", transition: "0.2s" } }}>
              <TableCell sx={{ fontSize: "0.95rem" }}>{r.author}</TableCell>
              <TableCell sx={{ fontSize: "0.95rem" }}>{excerpt(r.content)}</TableCell>
              <TableCell sx={{ fontSize: "0.95rem", textAlign: "right" }}>
                <Link to={`/reviews/${r.id}`} state={{ review: r, movie }} style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
