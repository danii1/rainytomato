'use strict';

import React from 'react';
import PomodoroTimer from 'components/pomodoro-timer';
import PlaylistWidget from 'components/playlist-widget';

export default React.createClass({
  render() {
    return (
      <div className='timer-route'>
        <PomodoroTimer />
        <PlaylistWidget playlist="https://soundcloud.com/exd/sets/anime-stuff" />
      </div>
    );
  }
});
