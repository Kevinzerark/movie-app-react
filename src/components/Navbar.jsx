import { useState } from "react";
import { FaBars } from "react-icons/fa";

// Componente Navbar: gerencia busca, navegação e alternância de favoritos
export default function Navbar({
  search,
  setSearch,
  searchMovies,
  fetchPopularMovies,
  showFavorites,
  setShowFavorites,
}) {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lida com o envio do formulário de busca
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await searchMovies();
    setLoading(false);
  };

  // Lida com o clique no "Home" (título ou menu)
  const handleHomeClick = async () => {
    setSearch("");
    setShowFavorites(false);
    setLoading(true);
    await fetchPopularMovies();
    setLoading(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative">
      {/* Título do app funciona como botão "Home" */}
      <h1
        className="text-3xl font-bold cursor-pointer hover:text-blue-400 transition"
        onClick={handleHomeClick}
      >
        Movie App
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto relative">
        {/* Formulário de busca */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full sm:w-auto flex-grow"
        >
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0 p-2 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? "..." : "Buscar"}
          </button>

          {/* Botão menu hambúrguer para mobile */}
          <button
            className="p-2 ml-2 rounded hover:bg-gray-700 transition sm:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars className="text-white" />
          </button>
        </form>

        {/* Botão Favoritos (visível no desktop) */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-3 py-2 rounded transition text-black hidden sm:inline-flex items-center gap-1 ${
            showFavorites
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {showFavorites ? "Ver Todos" : "Favoritos"}
        </button>
      </div>

      {/* Menu mobile sobreposto */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-start pt-24 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-gray-800/90 rounded shadow-lg w-40 flex flex-col gap-2 p-4 animate-scaleIn z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-2 hover:bg-gray-700 text-white rounded text-left"
              onClick={handleHomeClick}
            >
              Home
            </button>
            <button
              className="p-2 hover:bg-gray-700 text-white rounded text-left"
              onClick={() => {
                setShowFavorites(!showFavorites);
                setMobileMenuOpen(false);
              }}
            >
              {showFavorites ? "Ver Todos" : "Favoritos"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
