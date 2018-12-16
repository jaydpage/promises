import { Debounce } from "./Debounce";

describe("Debounce", () => {
  jest.useFakeTimers();

  describe("doAfterDelay", () => {
    it("should execute the provided callback after 500ms", () => {
      // Arrange
      const debounce = new Debounce();
      const callback = jest.fn();
      // Act
      debounce.doAfterDelay(callback);
      jest.runOnlyPendingTimers();
      // Assert
      expect(callback).toHaveBeenCalled();
    });
  });
});
