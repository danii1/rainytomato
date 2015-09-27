var alt = require('../alt');
var TimerActions = require('../actions/timer-actions');
import { TaskStatus, TaskType, TaskInterval } from '../helpers/tasks';

class LocationStore {
  constructor() {
    this.timeLeft = TaskInterval.WORK;
    this.status = TaskStatus.STOPPED;
    this.bindActions(TimerActions);
  }

  onStartTimer(taskType) {
    let stopTime;
    let currentTime = new Date();

    switch (taskType) {
      case TaskType.WORK:
        stopTime = new Date(currentTime.getTime() + TaskInterval.WORK);
        break;
      case TaskType.SHORT_BREAK:
        stopTime = new Date(currentTime.getTime() + TaskInterval.SHORT_BREAK);
        break;
      case taskType.LONG_BREAK:
        stopTime = new Date(currentTime.getTime() + TaskInterval.LONG_BREAK);
        break;
      default:
        break;
    }

    this.setState({
      status: TaskStatus.RUNNING,
      taskType: taskType,
      startTime: currentTime,
      stopTime: stopTime,
      timeLeft: stopTime - currentTime
    });
    console.log('timer started', this);
  }

  onStopTimer() {
    this.setState({
      status: TaskStatus.STOPPED,
      taskType: null,
      startTime: null,
      stopTime: null,
      timeLeft: TaskInterval.WORK
    });
    console.log('timer stopped', this);
  }

  onCheckTimer() {
    let timeLeft;
    if (this.stopTime) {
      timeLeft = this.stopTime - new Date();
    } else {
      timeLeft = TaskInterval.WORK;
    }
    this.setState({ timeLeft: timeLeft });
  }

}

export default alt.createStore(LocationStore, 'LocationStore');
