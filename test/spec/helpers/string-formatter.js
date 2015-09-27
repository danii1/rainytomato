'use strict';

describe('StringFormatter', () => {
  let StringFormatter = require('helpers/string-formatter');

  it('should throw error if time param is not number', () => {
    expect(
      () => StringFormatter.getTimerDateString(null)
    ).toThrowError(TypeError);
  });

  it('should throw error if time param is NaN', () => {
    expect(
      () => StringFormatter.getTimerDateString(NaN)
    ).toThrowError(RangeError);
  });

  it('should throw error if time param is below 0', () => {
    expect(
      () => StringFormatter.getTimerDateString(-1)
    ).toThrowError(RangeError);
  });

  it('should throw error if time param is above or equal one hour ', () => {
    let startTime = new Date()
    let stopTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    let timeInterval = stopTime - startTime;
    expect(
      () => StringFormatter.getTimerDateString(timeInterval)
    ).toThrowError(RangeError);
  });

  it('should return result if time param is below one hour ', () => {
    let startTime = new Date()
    let stopTime = new Date(startTime.getTime() + 59 * 60 * 1000);
    let timeInterval = stopTime - startTime;
    expect(
      StringFormatter.getTimerDateString(timeInterval)
    ).toEqual('59:00');
  });

  it('should return result in 00:00 format even if minute or second consist one digit', () => {
    let startTime = new Date()
    const oneMinute = 1 * 60 * 1000;
    const oneSecond = 1 * 1000;
    let stopTime = new Date(startTime.getTime() + oneMinute + oneSecond);
    let timeInterval = stopTime - startTime;
    expect(
      StringFormatter.getTimerDateString(timeInterval)
    ).toEqual('01:01');
  });

});
