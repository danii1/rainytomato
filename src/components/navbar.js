import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <span className="title">Rainy Tomato</span>
        <span className="nav-links">
          <Link to="timer">
            <i className="fa fa-clock-o" />
            <span className="text-link">Timer</span>
          </Link>
          <Link to="about">
            <i className="fa fa-info-circle" />
            <span className="text-link">About</span>
          </Link>
        </span>
      </nav>
    );
  }
}

export default Navbar;
