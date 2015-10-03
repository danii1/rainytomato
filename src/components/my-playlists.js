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
    if (value.indexOf('soundcloud') > -1) {
      return true;
    } else if (value.indexOf('youtu') > -1 && value.indexOf('list=') > -1) {
      return true;
    }
    return false;
  }

  _handleAddPlaylistClick(){
    const value = React.findDOMNode(this.refs.customPlaylistInput).value;

    if (this._validateInput(value)) {
      let modifiedPlaylists = this.state.playlists;
      modifiedPlaylists.push(value);

      this.setState({
        playlists: modifiedPlaylists
      });

      // reset input value after adding it playlists
      const input = React.findDOMNode(this.refs.customPlaylistInput);
      input.value = '';
    } else {
      console.log('Only youtube and soundcloud playlists are supported, got ' + value);
    }
  }

  render() {
    let playlists = this.state.playlists.map((playlist, index) => {
      return (
        <a className="my-playlist" key={index} href="#" onClick={() => this.props.onPlaylistChoose(playlist)}>{playlist}</a>
      );
    });
    return (
      <div className="my-playlists">
        <div>{playlists}</div>
        <div className="playlist-add-container">
          <input className="playlist-input" ref="customPlaylistInput" type="text" />
          <a href="#" className="playlist-add" onClick={::this._handleAddPlaylistClick}>Add playlist</a>
        </div>
      </div>
    );
  }
}

export default MyPlaylists;
