var alt = require('../alt');
import PlaylistActions from '../actions/playlist-actions';
import LocalStorageProvider from '../helpers/local-storage-provider';

class PlaylistStore {
  constructor() {
    this.playlists = LocalStorageProvider.get('playlists');

    if (this.playlists === null) {
      // set default values for now
      this.playlists = [
        'https://soundcloud.com/devolverdigital/sets/hotline-miami-official',
        'http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu'
      ];
    }

    this.chosenPlaylist = null;
    this.bindActions(PlaylistActions);
  }

  onAddPlaylist(playlist) {
    this.playlists.push(playlist);
    LocalStorageProvider.set('playlists', this.playlists);
  }

  onDeletePlaylist(playlist) {
    console.log(`delete playlist ${playlist}`);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
