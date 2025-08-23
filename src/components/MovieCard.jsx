import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

export default function MovieCard({
  movie,
  fetchMovieDetails,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <div className="group">
      {/* Card: somente a capa com overlay no hover */}
      <div className="relative rounded shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-xl transition duration-300 animate-fadeIn">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=Sem+Imagem"
          }
          alt={movie.title}
          className="w-full h-52 sm:h-60 md:h-64 lg:h-72 object-cover"
          onClick={() => fetchMovieDetails(movie.id)}
        />

        {/* Overlay (aparece no hover). pointer-events-none para não bloquear o clique na capa */}
        <div className="absolute inset-0 flex items-start justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {/* Nota */}
          <div
            className="inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold"
            style={{
              backgroundColor: "var(--color-note-bg)",
              color: "var(--color-text-note)",
            }}
          >
            <FaStar className="w-3 h-3 mr-1" />
            {movie.vote_average.toFixed(1)}
          </div>

          {/* Favoritar (pointer-events-auto para ser clicável) */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // não abrir detalhes ao clicar no coração
              toggleFavorite(movie);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full transition pointer-events-auto"
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
            {isFavorite(movie) ? (
              <FaHeart size={14} />
            ) : (
              <FaRegHeart size={14} />
            )}
          </button>
        </div>
      </div>
      {/* Exibe o título original se for diferente do título principal */}
      {movie.original_title && movie.original_title !== movie.title && (
        <p
          className="text-[10px] sm:text-xs text-center text-gray-400 mt-1"
          title={movie.original_title}
        >
          {movie.original_title}
        </p>
      )}
      {/* Título fora do card (abaixo da capa) */}
      <h3
        className="font-bold text-xs sm:text-sm line-clamp-2 mt-2 text-center"
        title={movie.title}
        style={{ color: "var(--color-text-primary)" }}
      >
        {movie.title}
      </h3>
    </div>
  );
}
