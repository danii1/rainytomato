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

  static getVideoId(url) {
    let videoMatches = url.match(/(?:v=)(.+?)(?:\&|$)/);
    let videoId = null;
    if (videoMatches.length > 1) {
      videoId = videoMatches[1];
    }
    return videoId;
  }

  static _getSnippetTitle(response) {
    let json = JSON.parse(response);
    if (json.items && json.items.length > 0) {
      return json.items[0].snippet.title;
    }
    return null;
  }

  static _getApiEndpoint(url) {
    const apiKey = process.env.YOUTUBE_KEY;

    let requestUrl = null;
    if (url.indexOf('list=') > -1) {
      // playlist
      const id = YoutubeApi.getPlaylistId(url);
      requestUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${apiKey}`;
    } else if (url.indexOf('v=')) {
      // single video
      const id = YoutubeApi.getVideoId(url);
      requestUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`;
    }
    return requestUrl;
  }

  static getPlaylistName(url) {
    const requestUrl = YoutubeApi._getApiEndpoint(url);
    return new Promise((resolve, reject) => {
      YoutubeApi._request(requestUrl).then((result) => {
        let apiResponse = this._getSnippetTitle(result);
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
      let videoId;

      if (item.kind === 'youtube#video') {
        // single video
        videoId = item.id;
      } else {
        // playlist item
        videoId = item.snippet.resourceId.videoId;
      }
      return {
        id: item.id,
        videoId: videoId,
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
      let request = new XMLHttpRequest();
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
    let apiKey = process.env.YOUTUBE_KEY;

    // TODO: extract url type recognition into separate function
    let id, requestUrl;
    if (url.indexOf('list=') > -1) {
      id = YoutubeApi.getPlaylistId(url);
      requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`;
    } else if (url.indexOf('v=')) {
      id = YoutubeApi.getVideoId(url);
      requestUrl = YoutubeApi._getApiEndpoint(url);
    }

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
