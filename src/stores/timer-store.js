var alt = require('../alt');
import TimerActions from '../actions/timer-actions';
import DateUtils from '../helpers/date-utils';
import { TaskStatus, TaskType, TaskInterval, TaskQueueBuilder } from '../helpers/tasks';

class TimerStore {
  constructor() {
    this._taskQueue = TaskQueueBuilder.build(4);
    this.timeLeft = TaskInterval.WORK;
    this.status = TaskStatus.STOPPED;
    this.taskType = TaskType.WORK;
    this.bindActions(TimerActions);
  }

  onSwitchTimer() {
    //let currentTaskStatus = this._taskQueue[0].status;
    if (this.status === TaskStatus.RUNNING) {
      this._stopTimer();
    } else {
      this._startTimer();
    }
  }

  _startTimer() {
    let stopTime;

    //let taskType = this._taskQueue[0].type;
    console.log(`starting task ${this.taskType}`);

    switch (this.taskType) {
      case TaskType.WORK:
        stopTime = DateUtils.getDateInFuture(TaskInterval.WORK);
        break;
      case TaskType.SHORT_BREAK:
        stopTime = DateUtils.getDateInFuture(TaskInterval.SHORT_BREAK);
        break;
      case taskType.LONG_BREAK:
        stopTime = DateUtils.getDateInFuture(TaskInterval.LONG_BREAK);
        break;
      default:
        break;
    }

    this.setState({
      status: TaskStatus.RUNNING,
      taskType: TaskType.WORK,
      startTime: new Date(),
      stopTime: stopTime,
      timeLeft: stopTime - new Date()
    });
    //console.log('timer started', this);
  }

  _stopTimer() {
    this.setState({
      status: TaskStatus.STOPPED,
      taskType: TaskType.WORK,
      startTime: null,
      stopTime: null,
      timeLeft: TaskInterval.WORK
    });
    //console.log('timer stopped', this);
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

export default alt.createStore(TimerStore, 'TimerStore');
