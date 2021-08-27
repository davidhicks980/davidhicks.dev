import { ReactiveController, ReactiveControllerHost } from 'lit';
import { filter, map } from 'rxjs/operators';
import { documentBreakpoints } from '../functions/breakpoint-emitter.component';

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
    const ids = !Array.isArray(breakpointIds) ? [breakpointIds] : breakpointIds;
    return documentBreakpoints.observer$.pipe(
      filter(([id, matches]) => ids.includes(id))
    );
  }
  /**
   * Will emit true if any of the provided breakpoints are inhabited, false otherwise
   *
   * @param {(string | string[])} breakpointIds
   * @returns {*}
   * @memberof BreakpointController
   */
  observeArea(breakpointIds: string | string[]) {
    const ids = !Array.isArray(breakpointIds) ? [breakpointIds] : breakpointIds;
    return documentBreakpoints.observeAllMatches$.pipe(
      map((queries) => ids.some((bp) => queries.get(bp) === true))
    );
  }

  hostConnected() {
    this.host.requestUpdate();
  }
}
