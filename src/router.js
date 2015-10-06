'use strict';

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';
import Layout from './routes/layout';
import Timer from './routes/timer';
import Settings from './routes/settings';
import About from './routes/about';

var routes = (
  <Route name="layout" handler={Layout} path='/'>
    <DefaultRoute handler={Timer} name="timer" />
    <Route name="settings" handler={Settings} />
    <Route name="about" handler={About} />
  </Route>
);

export default function () {
  var content = document.getElementById('react');
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, content);
  });
}
