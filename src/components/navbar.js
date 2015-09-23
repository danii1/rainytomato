import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <span className="title">Rainy Tomato</span>
        <span className="nav-links">
          <Link to="timer">Timer</Link>
          <Link to="about">About</Link>
        </span>
      </nav>
    );
  }
}

export default Navbar;
