import { ReactiveController, ReactiveControllerHost } from 'lit';
import { from } from 'rxjs';

export class DomController implements ReactiveController {
  host: ReactiveControllerHost;
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  handleEvent(name: string, action: Function) {
    from(name);
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {}
}
