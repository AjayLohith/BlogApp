import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DarkMode.css';

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
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
    <nav className={`navbar navbar-expand-lg navbar-${darkMode ? 'dark' : 'light'} ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <Link className="navbar-brand" to="/"> <b>NewsSpidey</b> </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
          {/* <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li> */}
          <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
              Genre
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li> */}
        </ul>
        <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`} onClick={toggleDarkMode}>
          {darkMode ? <span>☀️ Light</span> : <span>🌙 Dark</span>}
        </button>
      </div>
    </nav>
  );
}
