import { ReactiveController, ReactiveControllerHost } from 'lit';

export class JsonController implements ReactiveController {
  host: ReactiveControllerHost;

  async load(path: string) {
    if (typeof path === 'string' && path.length > 0) {
      return await fetch(path).then((response) => response.json());
    } else {
      throw TypeError('[JsonController] Provided path must be a string');
    }
  }
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {}
}
