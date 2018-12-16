import { Debounce } from "./Debounce";
import { UrlValidator } from "./UrlValidator";
import { promises } from "fs";
import { Logging } from "./Logging";

export class Query {
  private debounce: Debounce;
  private urlValidator: UrlValidator;
  private logging: Logging;

  constructor() {
    this.debounce = new Debounce();
    this.urlValidator = new UrlValidator();
    this.logging = new Logging();
  }

  public url(address: string) {
    this.debounce.doAfterDelay(() => this.queryUrlAsync(address));
  }

  private async queryUrlAsync(address: string): Promise<string> {
    console.log(">>>>>>>>>>>>>>>>>queryUrlAsync");
    const isValidUrl = await this.urlValidator.validate(address);
    if (!isValidUrl) {
      console.log(">>>>>>>>>>>>>>>>>invalidUrl");
      const errorMessage = "invalid url provided";
      this.logging.error(errorMessage);
      return Promise.reject();
    }
    const result = "result from query";
    this.logging.success(result);
    return Promise.resolve(result);
  }
}
