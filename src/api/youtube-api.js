export default class YoutubeApi {
  static getPlaylistId(url) {
    let playlistMatches = url.match(/(?:list=)(.+?)(?:\&|$)/);
    let playlistId = null;
    if (playlistMatches.length > 1) {
      playlistId = playlistMatches[1];
    }
    return playlistId;
  }

  static _parseApiResults(response) {
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

  static getPlaylist(id) {
    let apiKey = process.env.YOUTUBE_KEY;
    let requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`;
    return new Promise((resolve, reject) => {
      //let result = 'make request to ' + requestUrl;

      let request = new XMLHttpRequest();
      request.onload = () => {
        if (request.status === 200) {
          //console.log(request.response);
          let result = this._parseApiResults(request.responseText);
          resolve(result);
        } else {
          reject(request.responseText);
        }
      };
      request.onerror = () => {
        reject(request.responseText);
      };
      request.open('get', requestUrl, true);
      request.send();
    });

  }
}
