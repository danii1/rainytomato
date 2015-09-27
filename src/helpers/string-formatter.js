export default class StringFormatter {
  static getTimerDateString(time) {
    if (typeof time !== 'number') {
      throw new TypeError(`Time parameter should be number, got ${time} instead`);
    }

    if (time >= 1 * 60 * 60 * 1000 || time < 0 || isNaN(time)) {
      throw new RangeError('Time parameter should be within range of 0 and 1 hours');
    }

    let mins = Math.floor(time / 1000 / 60).toString();
    let secs = Math.floor(time / 1000 % 60).toString();
    mins = mins.length === 2 ? mins : '0' + mins;
    secs = secs.length === 2 ? secs : '0' + secs;
    return `${mins}:${secs}`;
  }
}
