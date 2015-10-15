import React from 'react';
import connectStores from 'alt/utils/connectToStores';
import PlaylistStore from '../stores/playlist-store';
import PlaylistActions from '../actions/playlist-actions';
import GoogleAnalytics from '../api/google-analytics';

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
    } else if (value.indexOf('youtu') > -1 && (value.indexOf('list=') > -1 ||
      value.indexOf('v=') > -1 )) {
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

      GoogleAnalytics.trackEvent('playlist', 'add');
    } else {
      console.log('Only youtube and soundcloud playlists are supported, got ' + value);
      GoogleAnalytics.trackEvent('playlist', 'add_error', 'invalid_url');
    }
  }

  _handleKeyPress(event) {
    if (event.keyCode === 13) {
      this._handleAddPlaylistClick();
    }
  }

  _handleRemovePlaylistClick(value) {
    PlaylistActions.deletePlaylist(value);
    GoogleAnalytics.trackEvent('playlist', 'remove');
  }

  _pasteLink(url) {
    const input = React.findDOMNode(this.refs.customPlaylistInput);
    input.value = url;
  }

  render() {
    let playlists = this.props.playlists.map((playlist, index) => {
      let playlistItem;

      if (playlist.type === 'soundcloud') {
        playlistItem = <span className="playlist-name"><i className="fa fa-soundcloud"></i>{playlist.name}</span>;
      } else {
        playlistItem = <span className="playlist-name"><i className="fa fa-youtube-play"></i>{playlist.name}</span>;
      }

      return (
        <div key={index} className="my-playlist">
          <a className="playlist-link" onClick={() => this.props.onPlaylistChoose(playlist)}>
            {playlistItem}
          </a>
          <a className="playlist-delete" onClick={() => this._handleRemovePlaylistClick(playlist)}><i className="fa fa-close"></i></a>
        </div>
      );
    });

    if (playlists.length === 0) {
      playlists = <div className="empty-playlists">
        Your collection is empty, add some playlists from YouTube or SoundCloud, for ex:
        <ul>
          <li>
            <a className="selectable" onClick={() => this._pasteLink('http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu')}>http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu</a>
          </li>
          <li>
            <a className="selectable" onClick={() => this._pasteLink('https://soundcloud.com/devolverdigital/sets/hotline-miami-official')}>https://soundcloud.com/devolverdigital/sets/hotline-miami-official</a>
          </li>
        </ul>
      </div>;
    }

    return (
      <div className="my-playlists">
        <div className="playlists-container">{playlists}</div>
        <div className="playlist-add-container">
          <input placeholder="Playlist url" className="playlist-input" ref="customPlaylistInput" type="text" onKeyUp={::this._handleKeyPress} />
          <a className="playlist-add" onClick={::this._handleAddPlaylistClick}>Add playlist</a>
        </div>
      </div>
    );
  }
}

export default MyPlaylists;
