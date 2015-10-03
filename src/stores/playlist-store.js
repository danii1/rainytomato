var alt = require('../alt');
import PlaylistActions from '../actions/playlist-actions';

class PlaylistStore {
  constructor() {
    try {
      this.playlists = JSON.parse(localStorage.getItem('playlists'));
    } catch (e) {
      this.playlists = null;
    }

    if (this.playlists === undefined || this.playlists === null) {
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
    localStorage.setItem('playlists', JSON.stringify(this.playlists));
  }

  onDeletePlaylist(playlist) {
    console.log(`delete playlist ${playlist}`);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
