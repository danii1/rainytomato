import alt from '../alt';

class PlaylistActions {
  constructor() {
    this.generateActions('addPlaylist', 'deletePlaylist');
  }
}

export default alt.createActions(PlaylistActions);
