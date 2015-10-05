import React from 'react';
import YoutubeWidget from './youtube-widget';
import SoundcloudWidget from './soundcloud-widget';
import MyPlaylists from './my-playlists';

class MusicSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null
    };
  }

  handlePlaylistChange(playlist) {
    this.setState({
      playlist: playlist
    });
  }

  handleResetPlaylist() {
    this.setState({
      playlist: null
    });
  }

  render() {
    const playlist = this.state.playlist;
    let playlistElement, sidebarHeader;
    if (playlist) {
      sidebarHeader = <div className="sidebar-header sidebar-playlist-header">
        <a className="sidebar-header-link" onClick={::this.handleResetPlaylist}>
          <div className="sidebar-title">
            <i className="fa fa-arrow-left"></i>
            <span>{playlist.name}</span>
          </div>
        </a>
      </div>;
      if (playlist.type === 'soundcloud') {
        playlistElement = <SoundcloudWidget {...this.state}/>;
      } else if (playlist.type === 'youtube') {
        playlistElement = <YoutubeWidget {...this.state} />;
      }
    } else {
      sidebarHeader = <div className="sidebar-header">My playlists</div>;
      playlistElement = <MyPlaylists onPlaylistChoose={::this.handlePlaylistChange}/>;
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
