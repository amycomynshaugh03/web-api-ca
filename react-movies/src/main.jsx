import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import ActorPage from "./pages/actorPage";
import PlaylistPage from "./pages/playlistPage";
import StartPage from "./pages/startPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import MyReviewsPage from "./pages/myReviewsPage";
import ProtectedRoutes from "./protectedRoutes";
import AuthContextProvider from "./contexts/authContext";




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
        <MoviesContextProvider>
     
        <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<StartPage />} />

        <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/playlist" element={<PlaylistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reviews/my-reviews" element={<MyReviewsPage />} />
        </Route>

        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/trending/today" element={<TrendingTodayPage />} />
        <Route path="/movies/popular" element={<PopularMoviesPage />} />
        <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
        <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/actors/:id" element={<ActorPage />} />

        <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
