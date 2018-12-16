import { Query } from "./Query";

describe("Query", () => {
  let originalSetTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => {};
  beforeEach(() => {
    originalSetTimeout = setTimeout;
    jest.useFakeTimers();
  });

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
      originalSetTimeout(() => {
        expect(urlValidator.validate).toHaveBeenCalled();
      }, 0);
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
      originalSetTimeout(() => {
        expect(logging.error).toHaveBeenCalled();
      }, 0);
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
      originalSetTimeout(() => {
        expect(urlValidator.validate).toHaveBeenCalledWith(address);
        expect(logging.success).toHaveBeenCalledWith(httpHandlerResult);
        expect(httpHandler.query).toHaveBeenCalledWith(address);
      }, 0);
    });
  });
});
