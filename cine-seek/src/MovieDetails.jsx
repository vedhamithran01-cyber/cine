// src/MovieDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'http://www.omdbapi.com/?apikey=a1153caa'; // Use your key!

const MovieDetails = () => {
  // useParams grabs the ID from the URL (e.g., /movie/tt1234567)
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`${API_URL}&i=${id}&plot=full`);
      const data = await response.json();
      
      // ADD THIS LINE RIGHT HERE:
      console.log("Movie Details Data:", data); 
      
      setMovie(data);
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <h2 style={{ color: 'white' }}>Loading...</h2>;

  // ADD THESE TWO LINES RIGHT HERE:
  if (movie.Response === "False") {
    return <h2 style={{ color: '#f9d3b4' }}>Database Error: {movie.Error}</h2>;
  }

  // Keep your existing return statement below...
  return (

    <div className="app">
      <Link to="/" style={{ color: '#f9d3b4', textDecoration: 'none', marginBottom: '2rem', fontSize: '1.2rem' }}>
        &larr; Back to Search
      </Link>
      
      <div className="details-container" style={{ display: 'flex', gap: '2rem', color: 'white', maxWidth: '800px', backgroundColor: '#343739', padding: '2rem', borderRadius: '12px' }}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
          alt={movie.Title} 
          style={{ borderRadius: '8px', maxHeight: '500px' }}
        />
        <div className="info" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 style={{ marginTop: 0 }}>{movie.Title} ({movie.Year})</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> ⭐️ {movie.imdbRating}</p>
          <p style={{ lineHeight: '1.6' }}><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;