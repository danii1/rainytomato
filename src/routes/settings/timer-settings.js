import React from 'react';
import Slider from 'react-nouislider';
import connectStores from 'alt/utils/connectToStores';
import SettingsStore from '../../stores/settings-store';
import SettingsActions from '../../actions/settings-actions';

@connectStores
class TimerSettings extends React.Component {
  static getStores() {
    return [SettingsStore];
  }

  static getPropsFromStores() {
     return SettingsStore.getState();
  }

  constructor(props) {
    super(props);

    this.taskSettings = {
      range: { min: 3, max: 4 },
      step: 1
    };

    this.shortBreakSettings = {
      range: { min: 3, max: 5 },
      step: 1
    };

    this.longBreakSettings = {
      range: { min: 15, max: 30 },
      step: 5
    };
  }

  _handleSliderChange(type, value) {
    let settings = this.props.settings;
    switch (type) {
      case 'tasks':
        settings.timer.workTasksLength = Math.round(value);
        break;
      case 'shortBreak':
        settings.timer.shortBreakInterval = Math.round(value);
        break;
      case 'longBreak':
        settings.timer.longBreakInterval = Math.round(value);
        break;
    }
    SettingsActions.saveSettings(settings);
  }

  render() {
    const timerSettings = this.props.settings.timer;

    return (
      <div className="tab-content timer-settings">
        <label>
          Set length: <span className="slider-value">{ timerSettings.workTasksLength }</span>
          <Slider onChange={(value) => this._handleSliderChange('tasks', value)} start={ [timerSettings.workTasksLength] } range={ this.taskSettings.range} step={ this.taskSettings.step } />
        </label>
        <label>
          Short break duration: <span className="slider-value">{ timerSettings.shortBreakInterval } min</span>
          <Slider onChange={(value) => this._handleSliderChange('shortBreak', value)} start={ [timerSettings.shortBreakInterval] } range={ this.shortBreakSettings.range } step={ this.shortBreakSettings.step } />
        </label>
        <label>
          Long break duration: <span className="slider-value">{ timerSettings.longBreakInterval } min</span>
          <Slider onChange={(value) => this._handleSliderChange('longBreak', value)} start={ [timerSettings.longBreakInterval] } range={ this.longBreakSettings.range } step={ this.longBreakSettings.step } />
        </label>
      </div>
    );
  }
}

export default TimerSettings;
