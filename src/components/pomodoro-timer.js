import StringFormatter from '../helpers/string-formatter';
import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import TimerStore from '../stores/timer-store';
import TimerActions from '../actions/timer-actions';

@connectStores
class PomodoroTimer extends React.Component {
  componentDidMount() {
    this.interval = setInterval( () => {
      TimerActions.checkTimer();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getStores() {
    return [TimerStore];
  }

  static getPropsFromStores() {
     let state = TimerStore.getState();
     return state;
  }

  handleClick() {
    if (this.props.status === 'stopped') {
      TimerActions.startTimer('work');
    }
    else {
      TimerActions.stopTimer();
    }
  }

  render() {
    const strokeWidth = 4, trailColor = '#ddd', color = 'tomato',
      dashSize = 301.635,
      dashArray = `${dashSize}px, ${dashSize}px`;

    let progress = 1 - (this.props.timeLeft / (25 * 60 * 1000));
    let dashOffset = dashSize - (dashSize * progress);

    let formattedDate = StringFormatter.getTimerDateString(this.props.timeLeft);

    let button;
    if (this.props.status === 'running') {
      button = <i className="fa fa-stop"></i>;
    } else {
      button = <i className="fa fa-play"></i>;
    }

    return (
      <div className="pomodoro-timer">
        <svg viewBox="0 0 100 100">
          <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" shapeRendering="crispEdges" stroke={trailColor} strokeWidth={strokeWidth} fillOpacity="0" style={{ shapeRendering: 'optimizeQuality' }}></path>
          <path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke={color} strokeWidth={strokeWidth} fillOpacity="0" strokeDasharray={dashArray} style={{ strokeDashoffset: dashOffset, shapeRendering: 'optimizeQuality' }}></path>
        </svg>
        <p className="progressbar-text">
          {formattedDate}
        </p>
        <a className="timer-control" onClick={() => this.handleClick()}>
          {button}
        </a>
      </div>
    );
  }
}

export default PomodoroTimer;
