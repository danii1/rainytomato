'use strict';

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';
import Layout from './routes/layout';
import Index from './routes/index';
import About from './routes/about';

var routes = (
  <Route name="layout" handler={Layout} path='/'>
    <DefaultRoute handler={Index} />
    <Route name="index" handler={Index} />
    <Route name="about" handler={About} />
  </Route>
);

export default function () {
  var content = document.getElementById('react');
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, content);
  });
}
