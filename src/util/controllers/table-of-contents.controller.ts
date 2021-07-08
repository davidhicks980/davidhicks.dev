import { ReactiveController, ReactiveControllerHost } from 'lit';
import { BehaviorSubject } from 'rxjs';
import { MediaQueryCallback } from '../../MediaQueryCallback';

const itemState = new BehaviorSubject({});

export class ListItemController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  getItemsBefore() {}
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {}
}
