import { ReactiveController, ReactiveControllerHost } from 'lit';

import { state } from './store';
export class StateController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }
  updateState(newState: { [key: string]: any }) {
    if (typeof newState != null) {
      state.updateState(newState);
    } else
      throw new TypeError(
        `[${this.constructor.name}.updateState] Null or undefined was provided as a state update`
      );
  }
  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    // Clear the timer when the host is disconnected
  }
}
