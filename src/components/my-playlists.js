import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import PlaylistStore from '../stores/playlist-store';
import PlaylistActions from '../actions/playlist-actions';

@connectStores
class MyPlaylists extends React.Component {
  static getStores() {
    return [PlaylistStore];
  }

  static getPropsFromStores() {
     return PlaylistStore.getState();
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
      PlaylistActions.addPlaylist(value);

      // reset input value after adding it playlists
      const input = React.findDOMNode(this.refs.customPlaylistInput);
      input.value = '';
    } else {
      console.log('Only youtube and soundcloud playlists are supported, got ' + value);
    }
  }

  _handleRemovePlaylistClick(value) {
    PlaylistActions.deletePlaylist(value);
  }

  render() {
    let playlists = this.props.playlists.map((playlist, index) => {
      let playlistItem;

      if (playlist.type === 'soundcloud') {
        playlistItem = <span className="playlist-name"><i className="fa fa-soundcloud"></i> {playlist.name}</span>;
      } else {
        playlistItem = <span className="playlist-name"><i className="fa fa-youtube-play"></i> {playlist.name}</span>;
      }

      return (
        <div key={index} className="my-playlist">
          <a className="playlist-link" onClick={() => this.props.onPlaylistChoose(playlist)}>
            {playlistItem}
          </a>
          <a className="playlist-delete" onClick={() => this._handleRemovePlaylistClick(playlist)}>x</a>
        </div>
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
