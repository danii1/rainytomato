import React from 'react';
import YoutubeWidget from './youtube-widget';
import SoundcloudWidget from './soundcloud-widget';
import MyPlaylists from './my-playlists';

class PlaylistWidget extends React.Component {
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

  render() {
    const playlist = this.state.playlist;
    let playlistElement;
    if (playlist) {
      if (playlist.indexOf('soundcloud') > -1) {
        playlistElement = <SoundcloudWidget {...this.state}/>;
      } else if (playlist.indexOf('youtu') > -1) {
        playlistElement = <YoutubeWidget {...this.state} />;
      } else {
        playlistElement = <MyPlaylists onPlaylistChoose={::this.handlePlaylistChange}/>;
      }
    } else {
      playlistElement = <MyPlaylists onPlaylistChoose={::this.handlePlaylistChange}/>;
    }

    return (
      <div className="playlist-widget">
        {playlistElement}
      </div>
    );
  }
}

export default PlaylistWidget;
