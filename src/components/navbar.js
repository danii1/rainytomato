import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    //this._handleMenuToggle();
  }

  _handleMenuToggle() {
    const element = document.getElementById('react');
    let menuOpen = element.className === 'menu-open';
    element.className = !menuOpen ? 'menu-open' : '';
  }

  _handleMusicToggle() {
    const element = document.getElementById('react');
    let sidebarOpen = element.className === 'music-sidebar-open';
    element.className = !sidebarOpen ? 'music-sidebar-open' : '';
  }

  _handleOverlayClick() {
    const element = document.getElementById('react');
    element.className = '';
  }

  render() {
    return (
      <nav className="navbar">
        <span className="title">
          <a onClick={::this._handleMenuToggle}>
            <i className="fa fa-bars"></i>
            <span className="optional-title"> Rainy Tomato</span>
          </a>
        </span>
        <span className="nav-links">
          <a onClick={::this._handleMusicToggle}>
            <i className="fa fa-music" />
          </a>
        </span>
        <a onClick={::this._handleOverlayClick} className="overlay">
        </a>
      </nav>
    );
  }
}

export default Navbar;
