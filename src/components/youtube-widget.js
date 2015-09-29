import React from 'react';
import YouTube from 'react-youtube';
import YoutubeApi from '../helpers/youtube-api';

class YoutubeWidget extends React.Component {
  constructor(props) {
    super(props);
    props.playlistId = 'PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu';

    YoutubeApi.getPlaylist(props.playlist).then( (result) => {
      console.log('result', result);
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
        list: this.props.playlistId
      }
    };

    return (
      <YouTube
        url={this.props.playlist}
        opts={opts}
      />
    );
  }
}

export default YoutubeWidget;
