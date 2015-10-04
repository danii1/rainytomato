import StringFormatter from '../helpers/string-formatter';

class SoundcloudApi {
  static getPlaylistName(url) {
    return new Promise((resolve, reject) => {
      // for now construct name from url,
      // later use api to get playlist or track real title
      if (url.indexOf('/sets/') > -1) {
        // set
        const urlParts = url.split('/sets/');
        try {
          const authorParts = urlParts[0].split('/');
          let author = StringFormatter.uppercaseWords(authorParts[authorParts.length - 1]);
          let title = StringFormatter.uppercaseWords(urlParts[urlParts.length - 1]);
          resolve(`${author} - ${title}`);
        } catch (e) {
          reject(`Failed to construct playlist name for url: ${url}`);
        }
      } else {
        // single track
        const urlParts = url.split('/');
        try {
          let title = StringFormatter.uppercaseWords(urlParts[urlParts.length - 1]);
          let author = StringFormatter.uppercaseWords(urlParts[urlParts.length - 2]);
          resolve(`${author} - ${title}`);
        } catch (e) {
          reject(`Failed to construct playlist name for url: ${url}`);
        }

      }
    });
  }
}

export default SoundcloudApi;
