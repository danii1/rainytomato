var alt = require('../alt');
import TimerActions from '../actions/timer-actions';
import DateUtils from '../helpers/date-utils';
import { TaskStatus, TaskInterval, TaskQueueBuilder } from '../helpers/tasks';

class TimerStore {
  constructor() {
    this.tasks = TaskQueueBuilder.build(4);
    this.currentTaskIndex = 0;
    this.timeLeft = TaskInterval.WORK;
    this.bindActions(TimerActions);
  }

  onSwitchTimer() {
    if (this.tasks[this.currentTaskIndex].status === TaskStatus.RUNNING) {
      this._stopTimer();
    } else {
      this._startTimer();
    }
  }

  _startTimer() {
    let stopTime;

    let currentTask = this.tasks[this.currentTaskIndex];
    stopTime = DateUtils.getDateInFuture(currentTask.duration);

    currentTask.status = TaskStatus.RUNNING;
    currentTask.startTime = new Date();
    currentTask.stopTime = stopTime;
    this.timeLeft = stopTime - new Date();
  }

  _stopTimer() {
    let currentTask = this.tasks[this.currentTaskIndex];
    currentTask.status = TaskStatus.STOPPED;
    currentTask.startTime = null;
    currentTask.stopTime = null;
    this.timeLeft = TaskInterval.WORK;
  }

  onCheckTimer() {
    let timeLeft;
    let currentTask = this.tasks[this.currentTaskIndex];
    if (currentTask.stopTime) {
      timeLeft = currentTask.stopTime - new Date();
    } else {
      timeLeft = TaskInterval.WORK;
    }
    this.setState({ timeLeft: timeLeft });
  }

}

export default alt.createStore(TimerStore, 'TimerStore');
