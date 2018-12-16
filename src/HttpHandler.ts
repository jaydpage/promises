export class HttpHandler {
  public query(address: string): Promise<string> {
    const result = `${address} result: result from query`;
    return Promise.resolve(result);
  }
}
