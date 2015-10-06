import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
  _handleMenuToggle() {
    const element = document.getElementById('react');
    element.className = '';
  }

  render() {
    return (
      <div className="menu">
        <div className="menu-header">
          <a onClick={::this._handleMenuToggle}>
            <i className="fa fa-bars"></i> Rainy Tomato
          </a>
        </div>
        <div className="menu-contents">
          <Link className="menu-item" to="timer">
            <i className="fa fa-clock-o"></i>
            <span className="menu-item-text">Timer</span>
          </Link>
          <Link className="menu-item" to="settings">
            <i className="fa fa-cog"></i>
            <span className="menu-item-text">Settings</span>
          </Link>
          <Link className="menu-item" to="about">
            <i className="fa fa-info-circle"></i>
            <span className="menu-item-text">About</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
