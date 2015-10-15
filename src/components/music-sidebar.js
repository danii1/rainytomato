import React from 'react';
import YoutubeWidget from './youtube-widget';
import SoundcloudWidget from './soundcloud-widget';
import MyPlaylists from './my-playlists';
import GoogleAnalytics from '../api/google-analytics';

class MusicSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null
    };
  }

  _handlePlaylistChange(playlist) {
    this.setState({
      playlist: playlist
    });

    GoogleAnalytics.trackEvent('playlist', 'choose');
  }

  _handleResetPlaylist() {
    this.setState({
      playlist: null
    });
  }

  _handleMenuToggle() {
    const element = document.getElementById('react');
    element.className = '';
  }

  render() {
    let playlist = this.state.playlist;
    let playlistElement = null;
    let sidebarHeader = null;
    if (playlist) {
      sidebarHeader = <div className="sidebar-header sidebar-playlist-header">
        <a className="sidebar-header-link" onClick={::this._handleResetPlaylist}>
          <div className="sidebar-title">
            <i className="fa fa-arrow-left"></i>
            <span>{playlist.name}</span>
          </div>
        </a>
      </div>;
      if (playlist.type === 'soundcloud') {
        playlistElement = <SoundcloudWidget playlist={this.state.playlist.url}/>;
      } else if (playlist.type === 'youtube') {
        playlistElement = <YoutubeWidget playlist={this.state.playlist.url} />;
      }
    } else {
      sidebarHeader = <div className="sidebar-header">
        <a onClick={::this._handleMenuToggle}>
          My playlists
        </a>
      </div>;
      playlistElement = <MyPlaylists onPlaylistChoose={::this._handlePlaylistChange}/>;
    }

    return (
      <div className="music-sidebar">
        {sidebarHeader}
        {playlistElement}
      </div>
    );
  }
}

export default MusicSidebar;
