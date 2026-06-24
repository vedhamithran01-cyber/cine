import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'http://www.omdbapi.com/?apikey=a1153caa';

const MovieDetails = ({ watchlist, onWatchlistToggle }) => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}&i=${id}&plot=full`);
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || 'Failed to fetch details.');
        }
      } catch (err) {
        console.error("Fetch details error:", err);
        setError('Network error. Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="main-content loading-view">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Fetching details from database...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="app-container">
        <div className="main-content error-view">
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ color: 'var(--danger)' }}>Database Error</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0.5rem auto 1.5rem auto' }}>
            {error || 'The requested title could not be loaded.'}
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isWatchlisted = watchlist.some((item) => item.imdbID === movie.imdbID);

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop';

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Back Link */}
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

        {/* Details Card Container */}
        <div className="details-wrapper">
          {/* Blurred Background Banner */}
          <div 
            className="details-banner-bg" 
            style={{ backgroundImage: `url(${posterUrl})` }}
          ></div>

          <div className="details-layout">
            {/* Poster Left */}
            <div className="details-poster-area">
              <img 
                src={posterUrl} 
                alt={movie.Title} 
                className="details-poster"
              />
            </div>

            {/* Info Right */}
            <div className="details-info-area">
              <div className="details-header">
                <h1>{movie.Title}</h1>
                <div className="details-meta-pills">
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <span className="meta-pill rating">
                      ⭐ {movie.imdbRating}
                    </span>
                  )}
                  {movie.Year && <span className="meta-pill">{movie.Year}</span>}
                  {movie.Rated && movie.Rated !== 'N/A' && <span className="meta-pill">{movie.Rated}</span>}
                  {movie.Runtime && movie.Runtime !== 'N/A' && <span className="meta-pill">{movie.Runtime}</span>}
                  {movie.Type && <span className="meta-pill" style={{ textTransform: 'capitalize' }}>{movie.Type}</span>}
                </div>
              </div>

              {/* Actions Row */}
              <div className="details-actions">
                <button 
                  className={`watchlist-toggle-btn ${isWatchlisted ? 'added' : ''}`}
                  onClick={() => onWatchlistToggle(movie)}
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
                  {isWatchlisted ? 'Saved to Watchlist' : 'Add to Watchlist'}
                </button>
              </div>

              {/* Plot Section */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <div>
                  <h3 className="details-section-title">Plot Summary</h3>
                  <p className="plot-text">{movie.Plot}</p>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="info-grid">
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Genre</span>
                    <span className="info-value">{movie.Genre}</span>
                  </div>
                )}
                {movie.Director && movie.Director !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Director</span>
                    <span className="info-value">{movie.Director}</span>
                  </div>
                )}
                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Writer</span>
                    <span className="info-value">{movie.Writer}</span>
                  </div>
                )}
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Cast</span>
                    <span className="info-value">{movie.Actors}</span>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Language</span>
                    <span className="info-value">{movie.Language}</span>
                  </div>
                )}
                {movie.Released && movie.Released !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Released</span>
                    <span className="info-value">{movie.Released}</span>
                  </div>
                )}
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Awards</span>
                    <span className="info-value">{movie.Awards}</span>
                  </div>
                )}
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div className="info-item">
                    <span className="info-label">Box Office</span>
                    <span className="info-value">{movie.BoxOffice}</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;