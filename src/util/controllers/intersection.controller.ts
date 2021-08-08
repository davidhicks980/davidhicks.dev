import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const observers = new Map() as Map<string, IntersectionObserver>;

type IntersectionObserverRecord = {
  id: string;
  entries: IntersectionObserverEntry[];
};

export class IntersectionController implements ReactiveController {
  host: ReactiveControllerHost;
  _handlerKey: string;
  _emitEntries: Subject<IntersectionObserverRecord>;
  _entryStream$: Observable<IntersectionObserverRecord>;
  _emitter: (id: string) => (entries: IntersectionObserverEntry[]) => void;
  observe(elements: HTMLElement[], observerId?: string) {
    let id = this._getObserverId(observerId);

    if (id) {
      for (let el of elements) {
        observers.get(id).observe(el);
      }
    }
    return this;
  }

  _getObserverId(id) {
    if (observers.has(id)) {
      return id;
    } else if (observers.has(this._handlerKey)) {
      return this._handlerKey;
    } else return false;
  }
  takeRecords(observerId: string) {
    const id = this._getObserverId(observerId),
      entries = observers.get(id).takeRecords();
    this._emitEntries.next({ id, entries });
    return this;
  }
  on(
    observerType: 'entry' | 'intersecting' | 'not-intersecting',
    activeId?: string
  ) {
    const id = this._getObserverId(activeId);
    if (id) {
      const obs = this._entryStream$.pipe(
        filter((entry) => entry.id === id),
        map((entry) => entry.entries)
      );

      switch (observerType) {
        case 'entry':
          return obs;
        case 'intersecting':
          return obs.pipe(
            map((entries) => entries.filter((entry) => !entry.isIntersecting))
          );
        case 'not-intersecting':
          return obs.pipe(
            map((entries) => entries.filter((entry) => entry.isIntersecting))
          );
      }
    }
  }
  use(id?: string) {
    if (observers.has(id)) {
      this._handlerKey = id;
    }
    return this;
  }
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this._emitEntries = new ReplaySubject(1);
    this._entryStream$ = this._emitEntries.asObservable();
    this._emitter = (id: string) => {
      return function (
        this: IntersectionController,
        entries: IntersectionObserverEntry[]
      ) {
        return this._emitEntries.next({ id, entries });
      };
    };
  }

  /**
   * Root is the element which you are observing for intersectings. Margin is the amount of space around the element you are observing for intersections. You can use a negative margin to watch an area smaller than the element (in other words, a space within the element). Threshold is the ratio of an observed element that must intersect the root element in order to fire your intersection callback.
   *
   * @param {HTMLElement} [root=null]
   * @param {{ top: number; left: number; right: number; bottom: number }} [margin={
   *       top: 0,
   *       left: 0,
   *       right: 0,
   *       bottom: 0,
   *     }]
   * @param {*} [threshold=[0, 0.5, 1]]
   * @memberof IntersectionController
   */
  initiate(
    observerId: string,
    root: HTMLElement = null,
    threshold = [0, 0.5, 1],
    margins: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    } = { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  ) {
    this._handlerKey = observerId;
    if (!observers.has(observerId)) {
      let rootMargin = ['top', 'right', 'bottom', 'left']
        .map((dir) => margins[dir])
        .join(' ');
      let obs = new IntersectionObserver(this._emitter(observerId).bind(this), {
        root,
        rootMargin,
        threshold,
      });
      observers.set(observerId, obs);
    }
    return this;
  }

  hostConnected() {
    this.host.requestUpdate();
  }
}
