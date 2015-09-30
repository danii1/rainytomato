import React from 'react';

class MyPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [
        'https://soundcloud.com/devolverdigital/sets/hotline-miami-official',
        'http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu'
      ]
    };
  }


  _validateInput(value) {
    // TODO: improve validation
    return (value.indexOf('soundcloud') > -1 || value.indexOf('youtu') > -1);
  }

  _handleAddPlaylistClick(){
    const value = React.findDOMNode(this.refs.customPlaylistInput).value;

    if (this._validateInput(value)) {
      let modifiedPlaylists = this.state.playlists;
      modifiedPlaylists.push(value);

      this.setState({
        playlists: modifiedPlaylists
      });
    } else {
      console.log('Only youtube and soundcloud playlists are supported, got ' + value);
    }
  }

  render() {
    let playlists = this.state.playlists.map((playlist, index) => {
      return (
        <li key={index}><a href="#" onClick={() => this.props.onPlaylistChoose(playlist)}>{playlist}</a></li>
      );
    });
    return (
      <div className="my-playlists">
        <ul>{playlists}</ul>
        <input className="playlist-input" ref="customPlaylistInput" type="text" />
        <button onClick={::this._handleAddPlaylistClick}>Add playlist</button>
      </div>
    );
  }
}

export default MyPlaylists;
