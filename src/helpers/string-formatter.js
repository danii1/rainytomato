export default class StringFormatter {
  static getTimerDateString(time) {
    let mins = Math.floor(time / 1000 / 60).toString();
    let secs = Math.floor(time / 1000 % 60).toString();
    mins = mins.length === 2 ? mins : '0' + mins;
    secs = secs.length === 2 ? secs : '0' + secs;
    return `${mins}:${secs}`;
  }
}
