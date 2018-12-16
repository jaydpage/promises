export class UrlValidator {
  public validate(address: string): Promise<boolean> {
    const isValid = address !== "";
    return Promise.resolve(isValid);
  }
}
