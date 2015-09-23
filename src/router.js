'use strict';

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';
import Layout from './routes/layout';
import Timer from './routes/timer';
import About from './routes/about';

var routes = (
  <Route name="layout" handler={Layout} path='/'>
    <DefaultRoute handler={Timer} />
    <Route name="timer" handler={Timer} />
    <Route name="about" handler={About} />
  </Route>
);

export default function () {
  var content = document.getElementById('react');
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, content);
  });
}
