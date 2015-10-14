var alt = require('../alt');
import PlaylistActions from '../actions/playlist-actions';
import LocalStorageProvider from '../models/local-storage-provider';
import YoutubeApi from '../api/youtube-api';
import SoundcloudApi from '../api/soundcloud-api';

class PlaylistStore {
  constructor() {
    this.playlists = LocalStorageProvider.get('playlists');

    if (this.playlists === null) {
      this.playlists = [];
    }

    this.chosenPlaylist = null;
    this.bindActions(PlaylistActions);
  }

  _pushPlaylistAsync(name, type, url) {
    const playlistItem = {
      name: name,
      type: type,
      url: url
    };
    this.playlists.push(playlistItem);
    LocalStorageProvider.set('playlists', this.playlists);
    this.emitChange();
  }

  onAddPlaylist(url) {
    const urlAlreadyPresent = this.playlists.some((playlist) => {
      return playlist.url === url;
    });

    if (urlAlreadyPresent) {
      console.log(`Playlist ${url} is already added`);
      return;
    }

    if (url.indexOf('soundcloud') > -1) {
      // soundcloud

      // convert mobile url to normal
      url = url.replace('m.soundcloud.com', 'soundcloud.com');

      SoundcloudApi.getPlaylistName(url).then((playlistName) => {
        this._pushPlaylistAsync(playlistName, 'soundcloud', url);
      }, (error) => {
        console.log(`Failed to retrieve soundcloud playlist name for url: ${url}, error:`, error);
      });

    } else {
      // youtube
      YoutubeApi.getPlaylistName(url).then((playlistName) => {
        this._pushPlaylistAsync(playlistName, 'youtube', url);
      }, (error) => {
        console.log(`Failed to retrieve youtube playlist name for url: ${url}, error:`, error);
      });
    }
  }

  onDeletePlaylist(playlist) {
    const modifiedPlaylists = this.playlists.filter((savedPlaylist) => {
      return (savedPlaylist.url !== playlist.url);
    });
    this.playlists = modifiedPlaylists;
    LocalStorageProvider.set('playlists', modifiedPlaylists);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
