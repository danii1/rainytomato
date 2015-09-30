var alt = require('../alt');
import TimerActions from '../actions/timer-actions';
import DateUtils from '../helpers/date-utils';
import { TaskType, TaskStatus, TaskInterval, TaskBuilder, TaskQueueBuilder } from '../helpers/tasks';

class TimerStore {
  constructor() {
    this.tasks = TaskQueueBuilder.build(4);
    this.currentTaskIndex = 0;
    this.timeLeft = TaskInterval.WORK;
    this.bindActions(TimerActions);
  }

  get currentTask() {
    return this.tasks[this.currentTaskIndex];
  }

  onSwitchTimer() {
    if (this.currentTask.status === TaskStatus.RUNNING) {
      // if current task is work then stop timer, if it's break we
      // should skip it and prepare next task
      if (this.currentTask.type === TaskType.WORK) {
        this._stopTimer();
      } else {
        this._nextTask();
      }
    } else {
      this._startTimer();
    }
  }

  _startTimer() {
    let stopTime = DateUtils.getDateInFuture(this.currentTask.duration);
    this.currentTask.status = TaskStatus.RUNNING;
    this.currentTask.startTime = new Date();
    this.currentTask.stopTime = stopTime;
    this.timeLeft = stopTime - new Date();
  }

  _stopTimer() {
    this.currentTask.status = TaskStatus.STOPPED;
    this.currentTask.startTime = null;
    this.currentTask.stopTime = null;
    this.timeLeft = this.currentTask.duration;
  }

  _nextTask() {
    this.currentTask.status = TaskStatus.STOPPED;
    this.currentTask.stopTime = new Date();
    this.currentTaskIndex++;
    this.timeLeft = this.currentTask.duration;
  }

  onCheckTimer() {
    let timeLeft;
    if (this.currentTask.stopTime) {
      timeLeft = this.currentTask.stopTime - new Date();
      // if current task time exceeded, stop current task and
      // proceed to the new one
      if (timeLeft <= 0) {
        timeLeft = 0;
        this.currentTask.status = TaskStatus.STOPPED;
        let finishedTaskType = this.currentTask.type;
        this.currentTaskIndex++;

        //we must briefly show that timer reached 0, and then display next task duration
        setTimeout(()=>{
          this.setState({timeLeft: this.currentTask.duration});
        }, 500);

        // add new task of the same type as finished one to the end of the queue
        this.tasks.push(TaskBuilder.build(finishedTaskType));
      }
    } else {
      timeLeft = this.currentTask.duration;
    }
    this.setState({ timeLeft: timeLeft });

  }

}

export default alt.createStore(TimerStore, 'TimerStore');
