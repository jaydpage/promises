import { Query } from "./Query";

describe("Query", () => {
  jest.useFakeTimers();

  describe("run", () => {
    it("should log an error when url is not valid", () => {
      // Arrange
      const query = new Query() as any;

      const urlValidator = {
        validate: jest.fn(() => Promise.resolve(false))
      };

      const logging = {
        error: jest.fn(() => console.log('>>>>>>>>>>>>>>>>>fake error logging')),
        success: jest.fn()
      };

      query.urlValidator = urlValidator;
      query.logging = logging;

      const address = "";
      // Act
      query.url(address);
      jest.runOnlyPendingTimers();
      jest.runAllTicks();
      // Assert
      expect(logging.error).toHaveBeenCalled();
    });
  });
});
