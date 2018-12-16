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
      return Promise.resolve(errorMessage);
    }

    const result = await this.httpHandler.query(address);
    this.logging.success(result);
    return Promise.resolve(result);
  }
}
