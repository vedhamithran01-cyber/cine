// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Watchlist from './Watchlist';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  // Initialize watchlist state from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cineseek_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to load watchlist from localStorage:", err);
      return [];
    }
  });

  // Sync watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cineseek_watchlist', JSON.stringify(watchlist));
    } catch (err) {
      console.error("Failed to save watchlist to localStorage:", err);
    }
  }, [watchlist]);

  // Toggle movie in/out of watchlist
  const handleWatchlistToggle = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.imdbID === movie.imdbID);
      if (exists) {
        // Remove it
        return prev.filter((item) => item.imdbID !== movie.imdbID);
      } else {
        // Add it (only store properties we actually need for display/API calls)
        const movieSummary = {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type
        };
        return [...prev, movieSummary];
      }
    });
  };

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar watchlistCount={watchlist.length} />
        
        {/* Application Views */}
        <Routes>
          {/* Search dashboard home */}
          <Route 
            path="/" 
            element={<Home watchlist={watchlist} onWatchlistToggle={handleWatchlistToggle} />} 
          />
          
          {/* Dynamic movie details */}
          <Route 
            path="/movie/:id" 
            element={<MovieDetails watchlist={watchlist} onWatchlistToggle={handleWatchlistToggle} />} 
          />

          {/* Saved movies watchlist */}
          <Route 
            path="/watchlist" 
            element={<Watchlist watchlist={watchlist} onWatchlistToggle={handleWatchlistToggle} />} 
          />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;