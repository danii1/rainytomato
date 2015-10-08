import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import SettingsStore from '../../stores/settings-store';
import SettingsActions from '../../actions/settings-actions';

@connectStores
class UiSettings extends React.Component {
  static getStores() {
    return [SettingsStore];
  }

  static getPropsFromStores() {
     return SettingsStore.getState();
  }

  handleToggleVideoClick() {
    let settings = this.props.settings;
    settings.ui.hideYoutubeVideo = !settings.ui.hideYoutubeVideo;
    SettingsActions.saveSettings(settings);
  }

  render() {
    return (
      <div className="tab-content ui-settings">
        <label><input type="checkbox" onChange={::this.handleToggleVideoClick} checked={this.props.settings.ui.hideYoutubeVideo} /> Hide YouTube video </label>
      </div>
    );
  }
}

export default UiSettings;
