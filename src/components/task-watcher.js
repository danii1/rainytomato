import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import TimerStore from '../stores/timer-store';
import TimerActions from '../actions/timer-actions';
import NotificationManager from '../models/notification-manager';
import StringFormatter from '../helpers/string-formatter';
import {TaskStatus} from '../models/tasks';

// One task watcher per application, should constantly poll TimerStore
// for changes
@connectStores
class TaskWatcher extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    TimerActions.checkTimer();
  }

  componentWillUnmount() {
    this.resetInterval();
  }

  resetInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
  }

  componentWillReceiveProps(nextProps) {
    let nextStatus = nextProps.tasks[nextProps.currentTaskIndex].status;
    if (nextStatus === TaskStatus.RUNNING && this.interval === null) {
      this.interval = setInterval( () => {
        TimerActions.checkTimer();
      }, 1000);
    }

    if (nextStatus !== TaskStatus.RUNNING && this.interval !== null) {
      this.resetInterval();
    }

    let time = nextProps.timeLeft;
    document.title = StringFormatter.getTimerDateString(time);

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
