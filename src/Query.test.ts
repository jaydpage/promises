import { Query } from "./Query";

describe("Query", () => {
  jest.useFakeTimers();

  describe("run", () => {
    it("should validate the url", () => {
      // Arrange
      const validationResult = false;
      const address = "";

      const query = new Query() as any;

      const urlValidator = {
        validate: jest.fn(() => Promise.resolve(validationResult))
      };

      query.urlValidator = urlValidator;

      // Act
      query.url(address);
      jest.runOnlyPendingTimers();

      // Assert
      expect(urlValidator.validate).toHaveBeenCalled();
    });

    it("should log an error when url is not valid", () => {
      // Arrange
      const validationResult = false;
      const address = "";

      const query = new Query() as any;

      const urlValidator = {
        validate: jest.fn(() => Promise.resolve(validationResult))
      };

      const logging = {
        error: jest.fn(),
        success: jest.fn()
      };

      query.urlValidator = urlValidator;
      query.logging = logging;

      // Act
      query.url(address);
      jest.runOnlyPendingTimers();

      // Assert
      expect(logging.error).toHaveBeenCalled();
    });

    it("should use http handler to query the address when url is valid", () => {
      // Arrange
      const validationResult = true;
      const address = "someUrlAddress";

      const query = new Query() as any;

      const logging = {
        error: jest.fn(),
        success: jest.fn()
      };

      const urlValidator = {
        validate: jest.fn(() => Promise.resolve(validationResult))
      };

      const httpHandlerResult = "someResult";
      const httpHandler = {
        query: jest.fn(() => Promise.resolve(httpHandlerResult))
      };

      query.urlValidator = urlValidator;
      query.httpHandler = httpHandler;
      query.logging = logging;

      // Act
      query.url(address);
      jest.runOnlyPendingTimers();

      // Assert
      expect(urlValidator.validate).toHaveBeenCalledWith(address);
      expect(logging.success).toHaveBeenCalledWith(httpHandlerResult);
      expect(httpHandler.query).toHaveBeenCalledWith(address);
    });
  });
});
