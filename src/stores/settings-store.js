var alt = require('../alt');
import SettingsActions from '../actions/settings-actions';
import LocalStorageProvider from '../models/local-storage-provider';

class SettingsStore {
  constructor() {
    this.settings = SettingsStore.loadSettings();
    this.bindActions(SettingsActions);
  }


  static loadSettings() {
    let settings = LocalStorageProvider.get('settings');

    // provide default settings, if settings are not in localStorage
    if (settings === null) {
      settings = {
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

    return settings;
  }

  onSaveSettings(settings) {
    this.settings = settings;
    LocalStorageProvider.set('settings', settings);
  }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
