var alt = require('../alt');
import PlaylistActions from '../actions/playlist-actions';
import LocalStorageProvider from '../models/local-storage-provider';

class PlaylistStore {
  constructor() {
    this.playlists = LocalStorageProvider.get('playlists');

    if (this.playlists === null) {
      // set default values for now
      this.playlists = [
        {
          name: 'devolverdigital - hotline-miami-official',
          type: 'soundcloud',
          url: 'https://soundcloud.com/devolverdigital/sets/hotline-miami-official'
        },
        {
          name: 'K-POP',
          type: 'youtube',
          url: 'http://www.youtube.com/playlist?list=PL-jIehwqNsThxWrhoWVGDRIFo2EKcV1Nu'
        }
      ];
    }

    this.chosenPlaylist = null;
    this.bindActions(PlaylistActions);
  }

  onAddPlaylist(url) {
    let playlistItem;

    //TODO: check if playlists already contain url

    if (url.indexOf('soundcloud') > -1) {
      // construct soundcloud object
      playlistItem = {
        name: url,
        type: 'soundcloud',
        url: url
      };
    } else {
      // construct youtube object
      playlistItem = {
        name: url,
        type: 'youtube',
        url: url
      };
    }


    this.playlists.push(playlistItem);
    LocalStorageProvider.set('playlists', this.playlists);
  }

  onDeletePlaylist(playlist) {
    console.log(`delete playlist ${playlist}`);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
