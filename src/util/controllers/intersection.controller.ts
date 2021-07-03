import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable, Subject } from 'rxjs';
import { MediaQueryCallback } from '../../MediaQueryCallback';

const observers = new Map() as Map<string, IntersectionObserver>;
const observeChanges = new Subject();
const scrollObservable = observeChanges.asObservable();
export class ScrollController implements ReactiveController {
  host: ReactiveControllerHost;
  observedResizeElements = [];
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }
  createObserver(
    name: string,
    callback: (observer: Observable<unknown>) => IntersectionObserverCallback,
    options: IntersectionObserverInit
  ) {
    observers.set(
      name,
      new IntersectionObserver(callback(scrollObservable), options)
    );
  }

  /**
   * Watches for changes in an element group.
   *
   * @param {number} breakpoint
   * @param {HTMLElement} el
   * @param {Function} action
   * @memberof ScrollController
   */
  observeElements(elements: HTMLElement[], observerName: string) {
    elements.forEach((el) => observers.get(observerName).observe(el));
  }
  /**
   * Uses Window.matchMedia on a given media query, with a callback action that will run whenever a change event is observed.
   *
   * @param {string} query
   * @param {MediaQueryCallback} action
   * @memberof ScrollController
   */

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    this.observedResizeElements.forEach((el) => {
      resizeObserver.unobserve(el);
      observerFunctions.delete(el);
    });
    this.breakpointQueries.forEach(([query, action]) =>
      query.removeEventListener('change', action)
    );
  }
}
