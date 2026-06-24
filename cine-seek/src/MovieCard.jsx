import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isWatchlisted, onWatchlistToggle }) => {
  // Use a default image if poster is not available or 'N/A'
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop';

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card-wrapper">
      <div className="movie-card">
        <div className="poster-container">
          <img 
            src={posterUrl} 
            alt={movie.Title} 
            className="movie-poster"
            loading="lazy"
          />
          <span className="card-badge">{movie.Type}</span>
          
          <button 
            className={`watchlist-btn-overlay ${isWatchlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWatchlistToggle(movie);
            }}
            title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
            aria-label={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isWatchlisted ? "var(--accent)" : "none"} 
              stroke={isWatchlisted ? "var(--accent)" : "currentColor"} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
        </div>
        
        <div className="movie-info">
          <div className="movie-year-type">
            <span>{movie.Year}</span>
          </div>
          <h3 className="movie-title">{movie.Title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;