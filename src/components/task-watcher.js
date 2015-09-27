import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import TimerStore from '../stores/timer-store';
import TimerActions from '../actions/timer-actions';

// One task watcher per application, should constantly poll TimerStore
// for changes
@connectStores
class TaskWatcher extends React.Component {
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

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default TaskWatcher;
