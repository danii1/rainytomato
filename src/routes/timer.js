'use strict';

import React from 'react';
import PomodoroTimer from 'components/pomodoro-timer';
import hideMenu from '../helpers/route-decorators';

@hideMenu
class TimerRoute extends React.Component {
  render() {
    return (
      <div className='timer-route'>
        <PomodoroTimer />
      </div>
    );
  }
}

export default TimerRoute;
