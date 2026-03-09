// src/Home.jsx
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

// Remember to keep YOUR_API_KEY here!
const API_URL = 'http://www.omdbapi.com/?apikey=a1153caa';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('War');
  }, []);

  return (
    <div className="app">
      <h1>Cine Seek</h1>
      <div className="search">
        <input
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
  <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Home;