import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import TimerStore from '../stores/timer-store';
import TimerActions from '../actions/timer-actions';
import NotificationManager from '../helpers/notification-manager';

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

  componentWillReceiveProps(nextProps) {
    let triggerNotification = this.props.currentTaskIndex < nextProps.currentTaskIndex;
    if (triggerNotification) {
      // trigger notification based on task type
      let task = this.props.tasks[this.props.currentTaskIndex];
      NotificationManager.showTaskNotification(task.type);
    }
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
