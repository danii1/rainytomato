var alt = require('../alt');
import PlaylistActions from '../actions/playlist-actions';
import LocalStorageProvider from '../models/local-storage-provider';
import YoutubeApi from '../api/youtube-api';

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
      this.playlists.push(playlistItem);
      LocalStorageProvider.set('playlists', this.playlists);

    } else {
      // construct youtube object
      const playlistId = YoutubeApi.getPlaylistId(url);
      YoutubeApi.getPlaylistName(playlistId).then((playlistName) => {
        console.log('getPlaylistName resolved', this);
        playlistItem = {
          name: playlistName,
          type: 'youtube',
          url: url
        };

        this.playlists.push(playlistItem);
        LocalStorageProvider.set('playlists', this.playlists);
        this.emitChange();
      }, (error) => {
        console.log(`Failed to retrieve youtube playlist name for url: ${url}, error:`, error);
      });
    }
  }

  onDeletePlaylist(playlist) {
    console.log(`delete playlist ${playlist}`);
  }
}

export default alt.createStore(PlaylistStore, 'PlaylistStore');
