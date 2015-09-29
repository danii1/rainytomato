'use strict';

import React from 'react';
import PomodoroTimer from 'components/pomodoro-timer';

export default React.createClass({
  render() {
    return (
      <div className='timer-route'>
        <PomodoroTimer />
      </div>
    );
  }
});
