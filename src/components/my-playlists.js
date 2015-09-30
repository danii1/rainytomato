import React from 'react';

class MyPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.props.playlists = [
      'https://soundcloud.com/devolverdigital/sets/hotline-miami-official',
      'http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu'
    ];
  }

  render() {
    let playlists = this.props.playlists.map((playlist, index) => {
      return (
        <li key={index}><a href="#" onClick={() => this.props.onPlaylistChoose(playlist)}>{playlist}</a></li>
      );
    });
    return (
      <div className="my-playlists">
        <h1>My Playlists</h1>
        <ul>{playlists}</ul>
      </div>
    );
  }
}

export default MyPlaylists;
