import { ReactiveController, ReactiveControllerHost } from 'lit';
import { MediaQueryCallback } from '../../MediaQueryCallback';

const observerFunctions = new WeakMap() as WeakMap<Element, Function[]>;

const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (let entry of entries) {
    observerFunctions.get(entry.target).forEach((fn) => fn());
  }
});
export class BreakpointController implements ReactiveController {
  host: ReactiveControllerHost;
  breakpointQueries: [MediaQueryList, MediaQueryCallback][] = [];
  observedResizeElements = [];
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  /**
   * Watches for changes in a specific element size. Calls an action whenever an observed object is resized
   *
   * @param {number} breakpoint
   * @param {HTMLElement} el
   * @param {Function} action
   * @memberof BreakpointController
   */
  observeResize(el: HTMLElement, action: Function) {
    resizeObserver.observe(el);
    observerFunctions.has(el)
      ? observerFunctions.get(el).push(action)
      : observerFunctions.set(el, [action]);
    this.observedResizeElements.push(el);
  }
  /**
   * Uses Window.matchMedia on a given media query, with a callback action that will run whenever a change event is observed.
   *
   * @param {string} query
   * @param {MediaQueryCallback} action
   * @memberof BreakpointController
   */
  observeBreakpoint(query: string, action: MediaQueryCallback) {
    const q = window.matchMedia(query).addEventListener('change', action);
    action(window.matchMedia(query));
    return this;
  }

  hostDisconnected() {
    this.observedResizeElements.forEach((el) => {
      resizeObserver.unobserve(el);
      observerFunctions.delete(el);
    });
  }
}
