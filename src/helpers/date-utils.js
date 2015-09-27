export default class DateUtils {
  static getDateInFuture(timeInterval) {
    if (typeof timeInterval !== 'number') {
      throw new TypeError(`timeInterval should be number, got ${timeInterval} instead`);
    }

    let currentTime = new Date();
    return new Date(currentTime.getTime() + timeInterval);
  }
}
