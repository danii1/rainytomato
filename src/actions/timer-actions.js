import alt from '../alt';

class TimerActions {
  constructor() {
    this.generateActions('checkTimer', 'switchTimer', 'resetTimerTasks');
  }
}

export default alt.createActions(TimerActions);
