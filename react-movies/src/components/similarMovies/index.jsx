import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import Spinner from '../spinner'

const SimilarMovies = ({ movieId }) => {
  const { data: movies, isLoading, isError, error } = useQuery({
    queryKey: ["similarMovies", { id: movieId }],
    queryFn: getSimilarMovies,
  });

if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const displayedMovies = movies || [];

  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Similar Movies</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {displayedMovies.slice(0, 8).map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
            <div style={{ width: "150px", textAlign: "center" }}>
              {m.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                  alt={m.title}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              ) : (
                <p>No image</p>
              )}
              <p>{m.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
