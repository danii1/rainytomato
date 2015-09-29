'use strict';
// CSS
import 'normalize.css';
import '../assets/css/app.css';

import React from 'react';
import { RouteHandler } from 'react-router';
import Navbar from 'components/navbar';
import BackgroundBox from 'components/background-box';
import TaskWatcher from 'components/task-watcher';
import PlaylistWidget from 'components/playlist-widget';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <BackgroundBox>
        </BackgroundBox>
        <div className="content">
          <RouteHandler />
          <PlaylistWidget playlist="http://www.youtube.com/watch?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu" />
        </div>
        <TaskWatcher />
      </div>
    );
  }
});
