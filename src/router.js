'use strict';

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';
import Layout from './routes/layout';
import Timer from './routes/timer';
import Settings from './routes/settings';
import TimerSettings from './routes/settings/timer-settings';
import UISettings from './routes/settings/ui-settings';
import Help from './routes/help';
import About from './routes/about';

var routes = (
  <Route name="layout" handler={Layout} path='/'>
    <DefaultRoute handler={Timer} name="timer" />
    <Route name="settings" handler={Settings}>
      <DefaultRoute handler={TimerSettings} name="timer-settings" />
      <Route handler={UISettings} name="ui" />
    </Route>
    <Route name="help" handler={Help} />
    <Route name="about" handler={About} />
  </Route>
);

export default function () {
  var content = document.getElementById('react');
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, content);
  });
}
