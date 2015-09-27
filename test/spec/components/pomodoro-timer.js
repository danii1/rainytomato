describe('PomodoroTimer', () => {
  let React = require('react/addons');
  let TestUtils = require('react/lib/ReactTestUtils');
  let PomodoroTimer = require('components/pomodoro-timer');

  var TimerActions;
  var TimerStore;

  beforeEach(() => {
    jasmine.clock().install(); // Mock out the built in timers
    TimerActions = require('actions/timer-actions');
    TimerStore = require('stores/timer-store');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should render', () => {
    var element = TestUtils.renderIntoDocument(<PomodoroTimer />);
    expect(element).toBeTruthy();
  });

  it('should render with default className', () => {
    var element = TestUtils.renderIntoDocument(<PomodoroTimer />);
    expect(React.findDOMNode(element).className).toEqual('pomodoro-timer');
  });

  it('should display proper timer value', () => {
    let element = TestUtils.renderIntoDocument(<PomodoroTimer/>);
    let timerStringValue = React.findDOMNode(element).innerText;
    const expectedValue = '25:00'
    expect(timerStringValue).toEqual(expectedValue);
  });

  it('should render switch button', () => {
    let element = TestUtils.renderIntoDocument(<PomodoroTimer/>);
    let button = TestUtils.findRenderedDOMComponentWithTag(element, 'a');
    expect(button.tagName).toEqual("A");
  });

  it('should trigger start timer action when clicking on button', () => {
    spyOn(TimerActions, 'startTimer');

    let element = TestUtils.renderIntoDocument(<PomodoroTimer/>);
    let button = TestUtils.findRenderedDOMComponentWithTag(element, 'a');
    TestUtils.Simulate.click(button);
    expect(TimerActions.startTimer).toHaveBeenCalled();
  });

  it('should trigger stop timer action when clicking on button while timer is running', () => {
    spyOn(TimerActions, 'stopTimer');

    let element = TestUtils.renderIntoDocument(<PomodoroTimer/>);
    let button = TestUtils.findRenderedDOMComponentWithTag(element, 'a');
    TestUtils.Simulate.click(button);
    TestUtils.Simulate.click(button);
    expect(TimerActions.stopTimer).toHaveBeenCalled();
  });
});
