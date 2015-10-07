'use strict';
import React from 'react';
import { Link, RouteHandler } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="settings-route">
        <div className="tab-box">
          <div className="tabs">
            <Link className="tab" to="timer-settings">
              Timer
            </Link>
            <Link className="tab" to="ui">
              UI
            </Link>
          </div>
          <RouteHandler />
        </div>
      </div>
    );
  }
});
