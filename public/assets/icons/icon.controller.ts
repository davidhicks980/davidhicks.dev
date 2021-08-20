import {
  ReactiveController,
  ReactiveControllerHost,
  TemplateResult,
} from 'lit';
import { iconFactory } from './icons';
import { render } from 'lit';

const icons = new Map() as Map<string, TemplateResult>;
export class IconController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    // Clear the timer when the host is disconnected
  }

  makeIcon(name, viewbox) {
    const icon = iconFactory(name, viewbox);
    return {
      renderTo: (parent: HTMLElement) => {
        render(icon, parent);
      },
      getIcon: () => icon,
    };
  }
}
