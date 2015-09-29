export default class YoutubeApi {
  static getPlaylist(id) {
    let apiKey = process.env.YOUTUBE_KEY;
    let requestUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=50&key=${apiKey}`;
    return new Promise((resolve) => {
      let result = 'make request to ' + requestUrl;
      resolve(result);
    });

  }
}
