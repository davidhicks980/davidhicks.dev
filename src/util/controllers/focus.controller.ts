import { ReactiveController, LitElement } from 'lit';
import { FocusTrap } from '../functions/goog-focus-trap';

export class FocusController implements ReactiveController {
  host: LitElement;
  private _trap: FocusTrap;
  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  trapElementChildren(root: HTMLElement, initiallyFocused: HTMLElement) {
    this._trap = new FocusTrap(root, { initialFocusEl: initiallyFocused });
    this._trap.trapFocus();
  }
  releaseFocus() {
    this._trap.releaseFocus();
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.releaseFocus();
  }
}
