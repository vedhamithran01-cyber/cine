// src/MovieCard.jsx
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    // The Link wraps the card and points to the specific movie's ID
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movie-card">
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
            alt={movie.Title} 
          />
        </div>
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;