import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/DarkMode.css';

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
  
      // Apply class changes after state update
      setTimeout(() => {
        if (newMode) {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
        } else {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark-mode');
        }
      }, 0); // ✅ Ensures mode applies after re-render
  
      return newMode;
    });
  };
  
  useEffect(() => {
    document.body.classList.add('light-mode');
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${darkMode ? 'dark' : 'light'} ${darkMode ? 'bg-dark' : 'bg-light'} sticky-top`}
      style={{ zIndex: 1020 }}
    >
      <Link className="navbar-brand" to="/"> <b>NewsSpidey</b> </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/' ? ' active-nav' : ''}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/sports' ? ' active-nav' : ''}`} to="/sports">Sports</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/entertainment' ? ' active-nav' : ''}`} to="/entertainment">Entertainment</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/health' ? ' active-nav' : ''}`} to="/health">Health</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/technology' ? ' active-nav' : ''}`} to="/technology">Technology</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/business' ? ' active-nav' : ''}`} to="/business">Business</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link${location.pathname === '/science' ? ' active-nav' : ''}`} to="/science">Science</Link>
          </li>
        </ul>
        <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`} onClick={toggleDarkMode}>
          {darkMode ? <span>☀️ Light</span> : <span>🌙 Dark</span>}
        </button>
      </div>
    </nav>
  );
}
