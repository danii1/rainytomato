import React from 'react';

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
      </div>
    );
  }
}

export default Menu;
