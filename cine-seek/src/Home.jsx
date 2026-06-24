import { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './components/SkeletonCard';

const API_URL = 'http://www.omdbapi.com/?apikey=a1153caa';

const Home = ({ watchlist, onWatchlistToggle }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('war'); // Initial search term
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(''); // '', 'movie', 'series', 'episode'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'year-desc', 'year-asc'
  const [error, setError] = useState('');

  const searchMovies = useCallback(async (title, type = '') => {
    if (!title.trim()) return;
    setLoading(true);
    setError('');
    try {
      const typeQuery = type ? `&type=${type}` : '';
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(title.trim())}${typeQuery}`);
      const data = await response.json();
      
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No results found.');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to connect to the movie database.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run initial search
  useEffect(() => {
    searchMovies(activeSearch, selectedType);
  }, [activeSearch, selectedType, searchMovies]);

  // Handle Search Submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setActiveSearch(searchTerm);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Helper to check if movie is watchlisted
  const isMovieWatchlisted = (movie) => {
    return watchlist.some((item) => item.imdbID === movie.imdbID);
  };

  // Client-side sorting logic
  const getSortedMovies = () => {
    if (!movies || movies.length === 0) return [];
    
    const sorted = [...movies];
    if (sortBy === 'year-desc') {
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year.substring(0, 4)) || 0;
        const yearB = parseInt(b.Year.substring(0, 4)) || 0;
        return yearB - yearA;
      });
    } else if (sortBy === 'year-asc') {
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year.substring(0, 4)) || 0;
        const yearB = parseInt(b.Year.substring(0, 4)) || 0;
        return yearA - yearB;
      });
    }
    return sorted; // 'default' unsorted (order from API)
  };

  const sortedMovies = getSortedMovies();

  return (
    <div className="app-container">
      <div className="main-content">
        
        {/* Hero Header */}
        <div className="dashboard-header">
          <h1>Discover Your Next Story</h1>
          <p>Search through millions of movies, TV series, and gaming titles</p>
        </div>

        {/* Search Controls Card */}
        <div className="search-controls-container">
          {/* Search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies, series, episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <button 
                className="clear-btn" 
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '65px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button 
              className="search-icon-btn" 
              onClick={handleSearchSubmit}
              aria-label="Search"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

          {/* Filters & Sorting controls */}
          <div className="filter-sort-row">
            {/* Filter Pills */}
            <div className="filter-group">
              <button 
                className={`filter-pill ${selectedType === '' ? 'active' : ''}`}
                onClick={() => setSelectedType('')}
              >
                All
              </button>
              <button 
                className={`filter-pill ${selectedType === 'movie' ? 'active' : ''}`}
                onClick={() => setSelectedType('movie')}
              >
                Movies
              </button>
              <button 
                className={`filter-pill ${selectedType === 'series' ? 'active' : ''}`}
                onClick={() => setSelectedType('series')}
              >
                Series
              </button>
              <button 
                className={`filter-pill ${selectedType === 'episode' ? 'active' : ''}`}
                onClick={() => setSelectedType('episode')}
              >
                Episodes
              </button>
            </div>

            {/* Sorting Select */}
            <div>
              <select 
                className="sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort movies"
              >
                <option value="default">Sort: Relevance</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="year-asc">Year: Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="movies-grid">
            {[...Array(8)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : sortedMovies.length > 0 ? (
          <div className="movies-grid">
            {sortedMovies.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                isWatchlisted={isMovieWatchlisted(movie)}
                onWatchlistToggle={onWatchlistToggle}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No results found</h3>
            <p>{error || `We couldn't find any results matching "${activeSearch}". Try searching for something else or adjusting your filters.`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;