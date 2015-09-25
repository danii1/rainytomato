var alt = require('../alt');
var TimerActions = require('../actions/timer-actions');

class LocationStore {
  constructor() {
    this.bindActions(TimerActions);
    this.timeLeft = 25 * 60 * 1000;
    this.status = 'stopped';
  }

  onStartTimer(taskType) {
    let stopTime;
    let currentTime = new Date();
    const workInterval = 25,
      shortBreakInterval = 5,
      longBreakInterval = 15;

    switch (taskType) {
      case 'work':
        stopTime = new Date(currentTime.getTime() + workInterval * 60 * 1000);
        break;
      case 'shortBreak':
        stopTime = new Date(currentTime.getTime() + shortBreakInterval * 60 * 1000);
        break;
      case 'longBreak':
        stopTime = new Date(currentTime.getTime() + longBreakInterval * 60 * 1000);
        break;
      default:
        break;
    }

    this.setState({
      status: 'running',
      taskType: taskType,
      startTime: currentTime,
      stopTime: stopTime,
      timeLeft: stopTime - currentTime
    });
    console.log('timer started', this);
  }

  onStopTimer() {
    this.setState({
      status: 'stopped',
      taskType: null,
      startTime: null,
      stopTime: null,
      timeLeft: 25 * 60 * 1000
    });
    console.log('timer stopped', this);
  }

  onCheckTimer() {
    const timeLeft = this.stopTime - new Date();
    this.setState({ timeLeft: timeLeft });
  }

}

export default alt.createStore(LocationStore, 'LocationStore');
