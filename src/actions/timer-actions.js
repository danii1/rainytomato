import alt from '../alt';

class TimerActions {
  startTimer(taskType) {
    this.dispatch(taskType);
  }

  stopTimer() {
    this.dispatch();
  }

  checkTimer() {
    this.dispatch();
  }
}

export default alt.createActions(TimerActions);
