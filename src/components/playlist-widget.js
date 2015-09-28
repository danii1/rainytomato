import React from 'react';
import YoutubeWidget from './youtube-widget';
import SoundcloudWidget from './soundcloud-widget';

class PlaylistWidget extends React.Component {
  render() {
    let playlist = this.props.playlist;
    let playlistElement;
    if (playlist.indexOf('soundcloud') > -1) {
      playlistElement = <SoundcloudWidget playlist={playlist}/>;
    } else if (playlist.indexOf('youtube') > -1) {
      playlistElement = <YoutubeWidget />;
    } else {
      playlistElement = <div className="emptyPlaylist"></div>;
    }

    return (
      <div className="playlist-widget">
        {playlistElement}
      </div>
    );
  }
}

export default PlaylistWidget;
