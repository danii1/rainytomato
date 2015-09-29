import React from 'react';
import YouTube from 'react-youtube';
import YoutubeApi from '../helpers/youtube-api';

class YoutubeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: 'PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu',
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

  render() {
    const opts = {
      height: '180px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        listType: 'playlist',
        loop: 1,
        showinfo: 1,
        controls: 1,
        modestbranding: 1,
        list: this.state.playlistId
      }
    };

    let playlistItems = null;
    if (this.state && this.state.playlistItems) {
      playlistItems = this.state.playlistItems.map((playlistItem) => {
        return (
          <div className="playlist-item">
            {playlistItem.title}
          </div>
        );
      });
    }

    return (
      <div className="youtube-widget">
        <div className="video">
          <YouTube
            url={this.props.playlist}
            opts={opts}
          />
        </div>
        <div className="playlist">
          {playlistItems}
        </div>
      </div>
    );
  }
}

export default YoutubeWidget;
