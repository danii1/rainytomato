'use strict';
// CSS
import 'normalize.css';
import '../assets/css/app.scss';

import React from 'react';
import { RouteHandler } from 'react-router';
import Navbar from 'components/navbar';
import BackgroundBox from 'components/background-box';
import TaskWatcher from 'components/task-watcher';
import MusicSidebar from 'components/music-sidebar';
import Menu from 'components/menu';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <BackgroundBox>
        </BackgroundBox>
        <div className="content">
          <RouteHandler />
        </div>
        <Menu />
        <MusicSidebar />
        <TaskWatcher />
      </div>
    );
  }
});
