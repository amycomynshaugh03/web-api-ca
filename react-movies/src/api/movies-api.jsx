export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.TMDB_KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
};

export const getFavorites = async (token) =>
  fetch(`http://localhost:8080/api/users/favorites`, {
    headers: { 
      'Authorization': token 
    }
  }).then(res => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  });

export const addFavorite = async (movieId, token) =>
  fetch(`http://localhost:8080/api/users/favorites`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": token 
    },
    body: JSON.stringify({ movieId })
  }).then(r => r.json());

export const removeFavorite = async (movieId, token) =>
  fetch(`http://localhost:8080/api/users/favorites/${movieId}`, {
    method: "DELETE",
    headers: { Authorization: token }
  }).then(r => r.json());