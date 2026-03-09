// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetails from './MovieDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* The home page shows our search bar */}
        <Route path="/" element={<Home />} />
        
        {/* The details page loads dynamically based on the movie ID */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;