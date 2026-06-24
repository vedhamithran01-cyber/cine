import { NavLink } from 'react-router-dom';

const Navbar = ({ watchlistCount }) => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ marginRight: '4px' }}
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 3v18" />
          <path d="M17 3v18" />
          <path d="M3 7h4" />
          <path d="M3 12h4" />
          <path d="M3 17h4" />
          <path d="M17 7h4" />
          <path d="M17 12h4" />
          <path d="M17 17h4" />
        </svg>
        Cine Seek
      </NavLink>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/watchlist" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Watchlist
          {watchlistCount > 0 && (
            <span className="watchlist-badge">{watchlistCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
