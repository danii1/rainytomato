var alt = require('../alt');
import SettingsActions from '../actions/settings-actions';
import LocalStorageProvider from '../models/local-storage-provider';

class SettingsStore {
  constructor() {
    this.settings = LocalStorageProvider.get('settings');

    if (this.settings === null) {
      this.settings = {
        timer: {
          shortBreakInterval: 5,
          longBreakInterval: 15,
          workTasksLength: 4
        },
        ui: {
          hideYoutubeVideo: false
        }
      };
    }

    this.bindActions(SettingsActions);
  }

  onSaveSettings(settings) {
    console.log('save settings called', settings);
    this.settings = settings;
    LocalStorageProvider.set('settings', settings);
  }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
