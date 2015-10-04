import alt from 'root/alt';
import { TaskType, TaskStatus } from 'models/tasks';
//import TimerStore as ts from 'stores/timer-store';
import DateUtils from 'helpers/date-utils';

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

  it('should stop the task once stopTime reached', () => {
    let state = TimerStore.getState();
    let action = TimerActions.SWITCH_TIMER;
    let task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.STOPPED);

    // check if timer started to run
    alt.dispatcher.dispatch({action, null});
    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.RUNNING);

    // mock future time and dispatch timer check
    let futureDate = DateUtils.getDateInFuture(task.duration + 1000);
    jasmine.clock().mockDate(futureDate);
    TimerActions.checkTimer();

    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(state.timeLeft).toEqual(0);
    expect(task.status).toEqual(TaskStatus.STOPPED);
  });

  it('should switch to the next task once stopTime reached and add previous \
    task to the end of the queue forming loop', () => {
    let state = TimerStore.getState();
    let action = TimerActions.SWITCH_TIMER;
    let task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.STOPPED);

    // check if timer started to run
    alt.dispatcher.dispatch({action, null});
    state = TimerStore.getState();
    task = state.tasks[state.currentTaskIndex];
    expect(task.status).toEqual(TaskStatus.RUNNING);

    let oldIndex = state.currentTaskIndex;
    let oldTasksLength = state.tasks.length;

    // mock future time and dispatch timer check
    let futureDate = DateUtils.getDateInFuture(task.duration + 1000);
    jasmine.clock().mockDate(futureDate);
    TimerActions.checkTimer();

    state = TimerStore.getState();
    let newIndex = state.currentTaskIndex;
    let newTasksLength = state.tasks.length;
    expect(newIndex).toEqual(oldIndex + 1);
    expect(newTasksLength).toEqual(oldTasksLength + 1);

    let lastTask = state.tasks[state.tasks.length - 1];
    expect(state.tasks[oldIndex].type).toEqual(lastTask.type);
  });

});
