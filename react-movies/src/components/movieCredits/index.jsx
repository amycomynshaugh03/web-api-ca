import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { Link } from "react-router";
import Spinner from "../spinner";

const imageBase = "https://image.tmdb.org/t/p/w200/";

const MovieCredits = ({ movieId }) => {
  const { data: credits, isLoading, isError, error } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem", fontFamily: "'Roboto', sans-serif" }}>
      <h2 style={{ borderBottom: "2px solid #1976d2" }}>Cast</h2>
      <div style={{ display: "flex", overflowX: "auto", gap: "1rem", padding: "1rem 0" }}>
        {credits.cast.slice(0, 15).map((person) => (
          <div
            key={person.id}
            style={{
              minWidth: "120px",
              textAlign: "center",
              flex: "0 0 auto",
              transition: "transform 0.2s",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {person.profile_path ? (
              <img
                src={`${imageBase}${person.profile_path}`}
                alt={person.name}
                style={{
                  width: "100px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                }}
              />
            ) : (
              <div style={{ width: "100px", height: "140px", borderRadius: "12px", backgroundColor: "#ccc" }} />
            )}
            <div
              style={{
                marginTop: "0.5rem",
                fontWeight: "bold",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={person.name}
            >
              <Link to={`/actors/${person.id}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                {person.name}
              </Link>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#555" }}>
              <em>{person.character}</em>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ borderBottom: "2px solid #1976d2", marginTop: "1rem" }}>Crew</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {credits.crew.slice(0, 10).map((person) => (
          <li
            key={person.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.3rem 0",
              fontSize: "0.9rem",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{person.name}</span>
            <span style={{ fontStyle: "italic", color: "#555" }}>{person.job}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
