export class Logging {
  public error(error: string): void {
    console.log("Error: ", error);
  }

  public success(success: string): void {
    console.log("Success: ", success);
  }
}
