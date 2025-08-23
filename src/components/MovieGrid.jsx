import MovieCard from "./MovieCard";

// O componente MovieGrid exibe um grid de componentes MovieCard
export default function MovieGrid({
  movies,
  fetchMovieDetails,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-8"
      style={{
        color: "var(--color-text-primary)",
      }}
    >
      {/* Renderiza um MovieCard para cada filme */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          fetchMovieDetails={fetchMovieDetails}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
}
