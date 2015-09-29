import React from 'react';
import YouTube from 'react-youtube';
import YoutubeApi from '../helpers/youtube-api';

class YoutubeWidget extends React.Component {
  constructor(props) {
    super(props);

    let playlistId = YoutubeApi.getPlaylistId(props.playlist);

    this.state = {
      playlistId: playlistId,
      playlistItems: null
    };

    YoutubeApi.getPlaylist(this.state.playlistId).then( (result) => {
      this.setState({
        playlistItems: result
      });
    }, (error) => {
      console.log('api error', error);
    });
  }

  _handlePlaylistItemClick(position) {
    if (this.player) {
      this.player.playVideoAt(position);
    }
  }

  onReady(event) {
    //console.log('player ready', event.target);
    this.player = event.target;
  }

  onPlay(event) {
    let index = event.target.getPlaylistIndex();
    this.setState({
      playbackIndex: index
    });
  }

  render() {
    const opts = {
      height: '180px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        listType: 'playlist',
        loop: 1,
        showinfo: 0,
        controls: 0,
        modestbranding: 1,
        list: this.state.playlistId
      }
    };

    let playlistItems = null;
    if (this.state && this.state.playlistItems) {
      playlistItems = this.state.playlistItems.map((playlistItem) => {
        let playbackStatus = <div className="playback-status"></div>;
        if (playlistItem.position === this.state.playbackIndex) {
          playbackStatus = <div className="playback-status"><i className="fa fa-play"></i></div>;
        }
        return (
          <a key={playlistItem.videoId} className="playlist-item" href="#" onClick={() => this._handlePlaylistItemClick(playlistItem.position)}>
            {playbackStatus}
            <div className="title">{playlistItem.title}</div>
          </a>
        );
      });
    }

    return (
      <div className="youtube-widget">
        <div className="video">
          <YouTube
            url={this.props.playlist}
            opts={opts}
            onReady={(event) => this.onReady(event)}
            onPlay={(event) => this.onPlay(event)}
          />
        </div>
        <div className="playlist">
          {playlistItems}
        </div>
      </div>
    );
  }
}

YoutubeWidget.propTypes = { playlist: React.PropTypes.string.isRequired };

export default YoutubeWidget;
