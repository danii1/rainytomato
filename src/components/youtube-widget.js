import React from 'react';
import YouTube from 'react-youtube';
import YoutubeApi from '../api/youtube-api';

class YoutubeWidget extends React.Component {
  constructor(props) {
    super(props);

    let playlistId = YoutubeApi.getPlaylistId(props.playlist);

    this.state = {
      playlistId: playlistId,
      playlistItems: null,
      playbackIndex: 0,
      playbackStatus: 'paused'
    };

    YoutubeApi.getPlaylist(props.playlist).then( (result) => {
      this.setState({
        playlistItems: result
      });
      this._loadPlaylist();
    }, (error) => {
      console.log('api error', error);
    });
  }

  _handlePlaylistItemClick(position) {
    if (this.player) {
      if (this.state.playbackIndex === position) {
        if (this.state.playbackStatus === 'playing') {
          this.player.pauseVideo();
        } else {
          this.player.playVideo();
        }
      } else {
        this.player.playVideoAt(position);
      }
    }
  }

  _loadPlaylist() {
    if (this.player && this.state.playlistItems) {
      const videoUrls = this.state.playlistItems.map((item) => {
        return item.videoId;
      });
      this.player.cuePlaylist(videoUrls);
    }
  }

  onReady(event) {
    this.player = event.target;
    this._loadPlaylist();
  }

  onPlay(event) {
    let index = event.target.getPlaylistIndex();
    this.setState({
      playbackIndex: index,
      playbackStatus: 'playing'
    });
  }

  onPause(event) {
    let index = event.target.getPlaylistIndex();
    this.setState({
      playbackIndex: index,
      playbackStatus: 'paused'
    });
  }

  render() {
    const opts = {
      height: '180px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        listType: 'playlist',
        loop: 1,
        showinfo: 0,
        controls: 0,
        modestbranding: 1
      }
    };

    let playlistItems = null;
    if (this.state && this.state.playlistItems) {
      playlistItems = this.state.playlistItems.map((playlistItem, index) => {
        let playbackStatus = <div className="playback-status"></div>;
        let playlistClasses = 'playlist-item';
        if (index === this.state.playbackIndex) {
          playlistClasses += ' active';
          if (this.state.playbackStatus === 'playing') {
            playbackStatus = <div className="playback-status"><i className="fa fa-play"></i></div>;
          } else {
            playbackStatus = <div className="playback-status"><i className="fa fa-pause"></i></div>;
          }

        }
        return (
          <a key={index} className={playlistClasses} href="#" onClick={() => this._handlePlaylistItemClick(index)}>
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
            opts={opts}
            onReady={(event) => this.onReady(event)}
            onPlay={(event) => this.onPlay(event)}
            onPause={(event) => this.onPause(event)}
            onStop={(event) => this.onPause(event)}
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
