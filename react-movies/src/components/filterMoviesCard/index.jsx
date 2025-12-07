import React from "react";
import { Card, CardContent, Typography, TextField, MenuItem, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") genres.unshift({ id: "0", name: "All" });

  const handleChange = (e, type) => props.onUserInput(type, e.target.value);

  return (
    <Card sx={{ width: 250, height: "100%", m: 0.5, backgroundColor: "#d0e7ff", boxShadow: 2 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 0.5, p: 1, height: "100%" }}>
        <Typography sx={{ fontSize: 14 }}><SearchIcon fontSize="small" /> Filter Movies</Typography>

        <FormControl size="small">
          <TextField label="Search" variant="filled" value={props.titleFilter} onChange={(e) => handleChange(e, "name")} size="small"/>
        </FormControl>

        <FormControl size="small">
          <TextField select label="Genre" variant="filled" value={props.genreFilter} onChange={(e) => handleChange(e, "genre")} size="small">
            {genres.map(g => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
          </TextField>
        </FormControl>

        <FormControl size="small">
          <TextField select label="Min Rating" variant="filled" value={props.ratingFilter} onChange={(e) => handleChange(e, "rating")} size="small">
            {["0","5","6","7","8"].map(v => <MenuItem key={v} value={v}>{v==="0"?"All":`${v}+`}</MenuItem>)}
          </TextField>
        </FormControl>

        <FormControl size="small">
          <TextField label="Year" variant="filled" value={props.yearFilter} onChange={(e) => handleChange(e, "year")} placeholder="e.g. 2023" size="small"/>
        </FormControl>

        <FormControl size="small">
          <TextField select label="Sort" variant="filled" value={props.sortBy || ""} onChange={(e) => handleChange(e, "sort")} size="small">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            <MenuItem value="release-desc">Release Date (Newest-Oldest)</MenuItem>
            <MenuItem value="release-asc">Release Date (Oldest-Newest)</MenuItem>
            <MenuItem value="rating-asc">Rating (Low-High)</MenuItem>
            <MenuItem value="rating-desc">Rating (High-Low)</MenuItem>
            <MenuItem value="runtime">Runtime (Longest)</MenuItem>
          </TextField>
        </FormControl>
      </CardContent>
    </Card>
  );
}
