import Cache from '../models/memory-cache';

export default class YoutubeApi {
  static getPlaylistId(url) {
    let playlistMatches = url.match(/(?:list=)(.+?)(?:\&|$)/);
    let playlistId = null;
    if (playlistMatches.length > 1) {
      playlistId = playlistMatches[1];
    }
    return playlistId;
  }

  static _parsePlaylistName(response) {
    let json = JSON.parse(response);
    if (json.items && json.items.length > 0) {
      return json.items[0].snippet.title;
    }
    return null;
  }

  static getPlaylistName(url) {
    const id = YoutubeApi.getPlaylistId(url);
    let apiKey = process.env.YOUTUBE_KEY;
    let requestUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${apiKey}`;

    return new Promise((resolve, reject) => {
      YoutubeApi._request(requestUrl).then((result) => {
        let apiResponse = this._parsePlaylistName(result);
        resolve(apiResponse);
      }, (error) => {
        reject(error);
      });
    });
  }

  static _parsePlaylistContents(response) {
    let json = JSON.parse(response);
    let result = json.items.map((item) => {
      let thumbnail = item.snippet.thumbnails.default.url;
      return {
        id: item.id,
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        position: item.snippet.position,
        thumbnail: thumbnail
      };
    });
    return result;
  }

  static _request(url) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest({ mozSystem: true });
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request.responseText);
        }
      };
      request.onerror = () => {
        reject(request.responseText);
      };
      request.open('get', url, true);
      request.send();
    });
  }

  static getPlaylist(url) {
    const id = YoutubeApi.getPlaylistId(url);
    let apiKey = process.env.YOUTUBE_KEY;
    let requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`;

    return new Promise((resolve, reject) => {
      const cachedPlaylist = Cache.get(`playlists/${id}/contents`);
      if (cachedPlaylist) {
        resolve(cachedPlaylist);
      } else {
        YoutubeApi._request(requestUrl).then((result) => {
          let apiResponse = this._parsePlaylistContents(result);

          // cache playlist to minimize youtube api hits
          Cache.set(`playlists/${id}/contents`, apiResponse);
          resolve(apiResponse);
        }, (error) => {
          reject(error);
        });
      }
    });
  }
}
