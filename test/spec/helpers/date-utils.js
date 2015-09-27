describe('DateUtils', () => {
  let DateUtils = require('helpers/date-utils');

  describe('getDateInFuture', () => {
    it('should throw error if time param is not number', () => {
      expect(
        () => DateUtils.getDateInFuture(null)
      ).toThrowError(TypeError);
    });

    it('should return future date', () => {
      let currentDate = new Date()
      let futureDate = DateUtils.getDateInFuture(5 * 1000);
      expect(futureDate).toBeGreaterThan(currentDate);
    });    
  });
});
