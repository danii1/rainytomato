import React from 'react';
import hideMenu from '../helpers/route-decorators';

@hideMenu
class HelpRoute extends React.Component {
  render() {
    return (
      <div className='help-route'>
        <div className='help-box centered-box'>
          <h5>Underlying principles</h5>
          <p>
            There are five basic steps to implementing the technique:
            <ol>
              <li>Decide on the task to be done</li>
              <li>Start the pomodoro timer</li>
              <li>Work on the task until the timer rings</li>
              <li>Take a short break</li>
              <li>After four pomodoros, take a longer break</li>
            </ol>
          </p>
          <p>
            For the purposes of the technique, "pomodoro" refers to the interval of time spent working. A short (3–5 minutes) rest separates consecutive pomodoros. Four pomodoros form a set. A longer (15–30 minute) rest is taken between sets.
          </p>
          <p>
            An essential aim of the technique is to reduce the impact of internal and external interruptions on focus and flow. A pomodoro is indivisible. When interrupted during a pomodoro either the other activity must be recorded and postponed or the pomodoro must be abandoned.
          </p>
        </div>
      </div>
    );
  }
}

export default HelpRoute;
