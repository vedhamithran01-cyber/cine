import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const Watchlist = ({ watchlist, onWatchlistToggle }) => {
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="back-link-container">
          <Link to="/" className="btn-secondary">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Search
          </Link>
        </div>

        <div className="dashboard-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h1>My Watchlist</h1>
          <p>
            {watchlist.length === 0 
              ? 'No movies saved yet' 
              : `You have ${watchlist.length} ${watchlist.length === 1 ? 'item' : 'items'} saved to watch`}
          </p>
        </div>

        {watchlist.length > 0 ? (
          <div className="movies-grid">
            {watchlist.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                isWatchlisted={true}
                onWatchlistToggle={onWatchlistToggle}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🍿</div>
            <h3>Your watchlist is empty</h3>
            <p>Explore movies and TV shows on the home page and bookmark them to keep track of what you want to watch.</p>
            <Link to="/" className="btn-primary">
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
