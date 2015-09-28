import alt from 'root/alt';
import { TaskType, TaskStatus } from 'helpers/tasks';
//import TimerStore as ts from 'stores/timer-store';

describe('TimerStore', () => {
  var TimerActions;
  var TimerStore;

  beforeEach(() => {
    jasmine.clock().install(); // Mock out the built in timers
    TimerActions = require('actions/timer-actions');
    TimerStore = require('stores/timer-store');
    alt.recycle();
    //TimerStore = alt.createStore(TimerStore, 'TimerStore');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should listen for switchTimer action', () => {
    // get initial state of store
    let state = TimerStore.getState();
    let action = TimerActions.SWITCH_TIMER;
    let task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.STOPPED);

    // dispatch action (store is listening for action)
    // NOTE: FB's dispatcher expects keys "action" and "data"
    alt.dispatcher.dispatch({action, null});
    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.RUNNING);
  });

  it('should start and stop timer on switchTimer action', () => {
    // get initial state of store
    let state = TimerStore.getState();
    let action = TimerActions.SWITCH_TIMER;
    let task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.STOPPED);

    // check if timer started to run
    alt.dispatcher.dispatch({action, null});
    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.RUNNING);

    // check if timer stopeed running
    alt.dispatcher.dispatch({action, null});
    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.STOPPED);
  });


});
