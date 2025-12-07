import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ActorPage = () => {
  const { id } = useParams();


  const { data: actor, isLoading: loadingActor, isError: errorActor } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getPersonDetails,
  });

  const { data: movieCredits, isLoading: loadingMovies, isError: errorMovies } = useQuery({
    queryKey: ["actorMovies", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (loadingActor || loadingMovies) return <Spinner />;
  if (errorActor || errorMovies) return <p>Error loading actor info.</p>;

  return (
    <div style={{ padding: "16px" }}>
      {}
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            style={{ width: "200px", borderRadius: "8px" }}
          />
        )}
        <div>
          <h2>{actor.name}</h2>
          <p>
            Born: {actor.birthday} {actor.place_of_birth && `in ${actor.place_of_birth}`}
          </p>
          <p>{actor.biography || "No biography available."}</p>
        </div>
      </div>

      {}
      {movieCredits?.cast?.length > 0 && (
        <>
          <h3 style={{ marginTop: "24px" }}>Appears in:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {movieCredits.cast.slice(0, 8).map((m) => (
              <Link key={m.credit_id} to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
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
        </>
      )}
    </div>
  );
};

export default ActorPage;
