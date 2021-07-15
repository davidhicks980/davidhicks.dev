import { ReactiveController, ReactiveControllerHost } from 'lit';

export class DomController implements ReactiveController {
  host: ReactiveControllerHost;
  cache = new Map() as Map<string, HTMLElement | HTMLElement[]>;
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }
  clear() {
    this.cache.clear();
  }

  getElement(selector: string) {
    return this.cache.get(selector);
  }
  query(selector: string, cache?: boolean, element?: HTMLElement): HTMLElement {
    const res = element
      ? (element.querySelector(selector) as HTMLElement)
      : (document.querySelector(selector) as HTMLElement);

    if (cache) {
      this.cache.set(selector, res);
    }
    return res;
  }
  queryAll(
    selector: string,
    cache?: boolean,
    element?: HTMLElement
  ): HTMLElement[] {
    let query = element
      ? (element.querySelectorAll(selector) as NodeListOf<HTMLElement>)
      : (document.querySelectorAll(selector) as NodeListOf<HTMLElement>);
    console.log(query);
    let res = Array.from(query);
    if (cache) {
      this.cache.set(selector, res);
    }
    return res;
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.cache.clear();
  }
}
