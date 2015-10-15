import React from 'react';
import { Link, RouteHandler } from 'react-router';
import routeTransitionActions from '../helpers/route-decorators';

@routeTransitionActions
class SettingsRoute extends React.Component {
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
}

export default SettingsRoute;
