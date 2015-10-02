import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.musicSidebarOpen = false;
  }

  _handleMusicToggle() {
    this.musicSidebarOpen = !this.musicSidebarOpen;
    console.log('toggle sidebar', this.musicSidebarOpen);
    const element = document.getElementById('react');
    if (this.musicSidebarOpen) {
      element.className = 'music-sidebar-open';
    } else {
      element.className = '';
    }
  }

  render() {
    return (
      <nav className="navbar">
        <span className="title">Rainy Tomato</span>
        <span className="nav-links">
          <a href="#" onClick={::this._handleMusicToggle}>
            <i className="fa fa-music" />
          </a>
        </span>
        <a href="#" onClick={::this._handleMusicToggle} className="overlay">
        </a>
      </nav>
    );
  }
}

export default Navbar;
