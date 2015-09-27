import alt from '../alt';

class TimerActions {
  switchTimer() {
    this.dispatch();
  }

  checkTimer() {
    this.dispatch();
  }
}

export default alt.createActions(TimerActions);
