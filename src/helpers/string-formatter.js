export default class StringFormatter {
  static getTimerDateString(time) {
    if (typeof time !== 'number') {
      throw new TypeError(`Time parameter should be number, got ${time} instead`);
    }

    if (time >= 1 * 60 * 60 * 1000 || time < 0 || isNaN(time)) {
      throw new RangeError('Time parameter should be within range of 0 and 1 hours');
    }

    let mins = Math.floor(time / 1000 / 60).toString();
    // we have to use round instead of floor, because timer doesn't guarantee
    // strict tick intervals
    let secs = Math.round(time / 1000 % 60).toString();

    // correct js timer
    if (secs >= 60) {
      secs = 59;
    }

    mins = mins.length === 2 ? mins : '0' + mins;
    secs = secs.length === 2 ? secs : '0' + secs;
    return `${mins}:${secs}`;
  }

  static escapeUri(uri) {
    return encodeURIComponent(uri).replace(/[!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  static uppercaseWords(inputString) {
    inputString = inputString.replace(/\-/g, ' ');
    return inputString.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
