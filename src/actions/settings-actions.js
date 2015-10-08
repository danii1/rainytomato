import alt from '../alt';

class SettingsActions {
  constructor() {
    this.generateActions('saveSettings');
  }
}

export default alt.createActions(SettingsActions);
