import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";

const API_KEY = "1f423ce4da537c86aa3bb6c5c8538caf";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Busca filmes populares da API
  const fetchPopularMovies = async (pageNum = 1) => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${pageNum}`
    );
    const data = await res.json();
    setMovies((prev) =>
      pageNum === 1 ? data.results : [...prev, ...data.results]
    );
    setPage(pageNum);
    setLoading(false);
  };

  // Busca filmes pelo termo de pesquisa
  const searchMovies = async (pageNum = 1) => {
    if (!search) return fetchPopularMovies();
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${search}&page=${pageNum}`
    );
    const data = await res.json();
    setMovies((prev) =>
      pageNum === 1 ? data.results : [...prev, ...data.results]
    );
    setPage(pageNum);
    setLoading(false);
  };

  // Busca detalhes de um filme específico
  const fetchMovieDetails = async (id) => {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    const data = await res.json();
    setSelectedMovie(data);
  };

  // Adiciona ou remove filme dos favoritos
  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Verifica se o filme está nos favoritos
  const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

  // Carrega filmes populares e favoritos salvos ao iniciar
  useEffect(() => {
    fetchPopularMovies();
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Scroll infinito para carregar mais filmes (desativado em favoritos)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        !showFavorites
      ) {
        if (search) {
          searchMovies(page + 1);
        } else {
          fetchPopularMovies(page + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, search, loading, showFavorites]);

  // Define quais filmes mostrar (favoritos ou resultados)
  const moviesToShow = showFavorites ? favorites : movies;

  return (
    <div
      className="min-h-screen p-4"
      style={{
        color: "var(--color-text-primary)",
        background:
          "linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-end))",
      }}
    >
      <Navbar
        search={search}
        setSearch={setSearch}
        searchMovies={() => searchMovies(1)}
        fetchPopularMovies={fetchPopularMovies}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ) : moviesToShow.length > 0 ? (
        <>
          <MovieGrid
            movies={moviesToShow}
            fetchMovieDetails={fetchMovieDetails}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
          {loading && <Loader />}
        </>
      ) : showFavorites ? (
        <p
          className="text-center mt-10 font-semibold"
          style={{ color: "var(--color-note-text)" }}
        >
          Nenhum filme favoritado ainda.
        </p>
      ) : (
        <p
          className="text-center mt-10 font-semibold"
          style={{ color: "var(--color-note-text)" }}
        >
          Nenhum filme encontrado.
        </p>
      )}
    </div>
  );
}

export default App;
