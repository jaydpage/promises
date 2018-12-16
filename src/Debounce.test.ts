import { Debounce } from "./Debounce";

describe("Debounce", () => {
  jest.useFakeTimers();

  describe("doAfterDelay", () => {
    it("should execute the provided callback after the timeout period", () => {
      // Arrange
      const debounce = new Debounce();
      const callback = jest.fn();
      // Act
      debounce.doAfterDelay(callback);
      jest.runOnlyPendingTimers();
      // Assert
      expect(callback).toHaveBeenCalledTimes(1);
    });
    it("should execute only the last provided callback after the timeout period", () => {
      // Arrange
      const debounce = new Debounce();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();
      // Act
      debounce.doAfterDelay(callback1);
      jest.advanceTimersByTime(400);
      debounce.doAfterDelay(callback2);
      jest.advanceTimersByTime(450);
      debounce.doAfterDelay(callback3);
      jest.runAllTimers();

      // Assert
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
      expect(callback3).toHaveBeenCalled();
    });
  });
});
