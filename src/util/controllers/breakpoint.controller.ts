import { ReactiveController, ReactiveControllerHost } from 'lit';
import { filter } from 'rxjs/operators';
import { documentBreakpoints } from '../primitives/breakpoint-emitter.component';

const observerFunctions = new WeakMap() as WeakMap<Element, Function[]>;

const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (let entry of entries) {
    observerFunctions.get(entry.target).forEach((fn) => fn());
  }
});
export class BreakpointController implements ReactiveController {
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  /**
   * Uses Window.matchMedia on a given media query
   *
   * @param {string} id - the name of the query as specified in the document breakpoints file
   * @memberof BreakpointController
   */
  observe(breakpointIds: string | string[]) {
    let ids = !Array.isArray(breakpointIds) ? [breakpointIds] : breakpointIds;

    return documentBreakpoints.observer.pipe(
      filter(([id, matches]) => ids.includes(id))
    );
  }

  hostConnected() {
    this.host.requestUpdate();
  }
}
