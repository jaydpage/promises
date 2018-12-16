export class Debounce {
  private delay: number = 500;
  private callback: Function;
  private timerId: number;

  constructor() {
    this.callback = () => {};
    this.timerId = setTimeout(this.callback, 0);
  }

  public doAfterDelay(callback: Function) {
    this.callback = callback;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.delay);
  }
}
