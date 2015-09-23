'use strict';
// CSS
import 'normalize.css';
import '../assets/css/app.css';

import React from 'react';
import { Link, RouteHandler } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <nav className="navbar">
          <span className="title">App</span>
          <span className="nav-links">
            <Link to="index">Index</Link>
            <Link to="about">About</Link>
          </span>
        </nav>
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});
