import { FaHeart, FaRegHeart, FaArrowLeft, FaStar } from "react-icons/fa";

export default function MovieDetails({
  movie,
  setSelectedMovie,
  toggleFavorite,
  isFavorite,
}) {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div
      className="rounded-lg shadow-lg p-4 sm:p-6 max-w-6xl mx-auto animate-fadeIn"
      style={{
        backgroundColor: "var(--color-card-bg)",
        boxShadow: "0 4px 6px var(--color-card-shadow)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Botão para voltar à lista de filmes */}
      <button
        onClick={() => setSelectedMovie(null)}
        className="flex items-center gap-2 mb-4 px-3 py-2 rounded transition"
        style={{
          backgroundColor: "var(--color-btn-primary)",
          color: "var(--color-text-primary)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            "var(--color-btn-primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-btn-primary)")
        }
      >
        <FaArrowLeft /> Voltar
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow-lg object-cover"
        />

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {movie.title}
            </h2>
            {/* Botão de favorito */}
            <button
              onClick={() => toggleFavorite(movie)}
              className="p-2 rounded text-lg transition"
              style={{
                backgroundColor: isFavorite(movie)
                  ? "var(--color-btn-fav-red)"
                  : "var(--color-btn-fav-green)",
                color: "var(--color-text-primary)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = isFavorite(movie)
                  ? "var(--color-btn-fav-red-hover)"
                  : "var(--color-btn-fav-green-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = isFavorite(movie)
                  ? "var(--color-btn-fav-red)"
                  : "var(--color-btn-fav-green)")
              }
            >
              {isFavorite(movie) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {/* Nota média e quantidade de votos */}
          <p
            className="flex items-center gap-2 font-semibold"
            style={{ color: "var(--color-text-note)" }}
          >
            <FaStar /> {movie.vote_average.toFixed(1)} ({movie.vote_count} votos)
          </p>

          {/* Data de lançamento */}
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Lançamento:</span>{" "}
            {movie.release_date || "Desconhecida"}
          </p>
          {/* Gêneros do filme */}
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Gêneros:</span>{" "}
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((g) => g.name).join(", ")
              : "Desconhecido"}
          </p>

          {/* Sinopse do filme */}
          <div>
            <h3
              className="font-semibold text-lg sm:text-xl mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Sinopse:
            </h3>
            <p className="text-sm sm:text-base">
              {movie.overview || "Sem sinopse disponível."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
