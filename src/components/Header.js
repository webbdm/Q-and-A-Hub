import React from "react";
import Align from "./layout/Align";
import { Link } from "react-router-dom";

import './Header.scss';

const Header = () => {
  return <header className="App-header">
    <nav className="navbar ">
      <div href="#" className="navbar-brand">Q and A</div>
      <div className="nav-links">
        <Link
          className="nav-link"
          to="/profile"
        >
          Profile
  			</Link>

        <Link
          className="nav-link"
          to="/"
        >
          Question
  			</Link>
      </div>
    </nav>
    <Align>
      <div className="nav">
      </div>
    </Align>
  </header>;
};

export default Header;
