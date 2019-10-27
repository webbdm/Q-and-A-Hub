import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return <header className="App-header pl-4">
    <nav className="navbar ">
      <div href="#" className="navbar-brand">Mentorship Hub</div>

      <div className="nav-links">
        <Link
          className="nav-link"
          to="/"
        >
          Questions
				</Link>
        <Link
          className="nav-link"
          to="/community"
        >
          Community
				</Link>
        <Link
          className="nav-link"
          to="/profile"
        >
          Profile
				</Link>
      </div>
    </nav>
  </header>;
};

export default Header;
