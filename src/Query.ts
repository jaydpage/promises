import { Debounce } from "./Debounce";
import { UrlValidator } from "./UrlValidator";
import { Logging } from "./Logging";
import { HttpHandler } from "./HttpHandler";

export class Query {
  private debounce: Debounce;
  private urlValidator: UrlValidator;
  private logging: Logging;
  private httpHandler: HttpHandler;

  constructor() {
    this.debounce = new Debounce();
    this.urlValidator = new UrlValidator();
    this.logging = new Logging();
    this.httpHandler = new HttpHandler();
  }

  public url(address: string) {
    this.debounce.doAfterDelay(() => this.queryUrlAsync(address));
  }

  private async queryUrlAsync(address: string): Promise<string> {
    const isValidUrl = await this.urlValidator.validate(address);

    if (!isValidUrl) {
      const errorMessage = "invalid url provided";
      this.logging.error(errorMessage);
      // TODO I don't think it is a good idea to reject here as you are not bubbling the promise up to anything
      //      that can do a .catch on it. In the later versions of node an uncaught promise is going to result in
      //      process terminating. I think a Promise.resolve() will be fine here as the real thin you are after is 
      //      the logging and that has already happened at this point.
      return Promise.reject();
    }

    const result = await this.httpHandler.query(address);
    this.logging.success(result);
    return Promise.resolve(result);
  }
}
