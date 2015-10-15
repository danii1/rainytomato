import SoundManager from '../models/sound-manager';
import { TaskStatus, TaskType } from '../models/tasks';
import StringFormatter from '../helpers/string-formatter';
import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import TimerStore from '../stores/timer-store';
import TimerActions from '../actions/timer-actions';
import GoogleAnalytics from '../api/google-analytics';

@connectStores
class PomodoroTimer extends React.Component {
  static getStores() {
    return [TimerStore];
  }

  static getPropsFromStores() {
     return TimerStore.getState();
  }

  handleClick() {
    const currentTask = this.props.tasks[this.props.currentTaskIndex];
    if (currentTask.status === TaskStatus.STOPPED) {
      SoundManager.playStartSound();
      GoogleAnalytics.trackEvent('timer', 'start', currentTask.type);
    } else {
      GoogleAnalytics.trackEvent('timer', 'stop', currentTask.type);
    }
    TimerActions.switchTimer();
  }

  render() {
    const strokeWidth = 4, trailColor = '#ddd', color = 'tomato',
      dashSize = 301.635,
      dashArray = `${dashSize}px, ${dashSize}px`;

    let currentTask = this.props.tasks[this.props.currentTaskIndex];
    let progress = 1 - (this.props.timeLeft / currentTask.duration);
    let dashOffset = dashSize - (dashSize * progress);

    let formattedDate = StringFormatter.getTimerDateString(this.props.timeLeft);

    let button;
    if (currentTask.type === TaskType.WORK) {
      if (currentTask.status === TaskStatus.RUNNING) {
        button = <div><i className="fa fa-stop"></i> Stop Pomodoro </div>;
      } else {
        button = <div><i className="fa fa-play"></i> Start Pomodoro </div>;
      }
    } else {
      if (currentTask.status === TaskStatus.RUNNING) {
        button = <div><i className="fa fa-step-forward"></i> Skip Break </div>;
      } else {
        button = <div><i className="fa fa-play"></i> Start Break </div>;
      }
    }


    return (
      <div className="timer-box">
        <div className="pomodoro-timer">
          <svg viewBox="0 0 100 100">
            <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" shapeRendering="crispEdges" stroke={trailColor} strokeWidth={strokeWidth} fillOpacity="0" style={{ shapeRendering: 'optimizeQuality' }}></path>
            <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke={color} strokeWidth={strokeWidth} fillOpacity="0" strokeDasharray={dashArray} style={{ strokeDashoffset: dashOffset, shapeRendering: 'optimizeQuality' }}></path>
          </svg>
          <p className="progressbar-text">
            {formattedDate}
          </p>
        </div>
        <a ref="switchTimer" className="timer-control" onClick={() => this.handleClick()}>
          {button}
        </a>
      </div>
    );
  }
}

export default PomodoroTimer;
