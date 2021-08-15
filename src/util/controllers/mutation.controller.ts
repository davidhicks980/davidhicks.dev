import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const observers = new Map() as Map<string, MutationObserver>;

type MutationObserverRecord = {
  id: string;
  entries: MutationRecord[];
};

const undefinedID = Error(
  'An ID has not been defined for your intersection observer'
);
export class MutationController implements ReactiveController {
  host: ReactiveControllerHost;
  private _handlerKey: string;
  private _emitEntries: Subject<MutationObserverRecord>;
  private _entryStream$: Observable<MutationObserverRecord>;
  private _emitter: (id: string) => (entries: MutationRecord[]) => void;

  observe(elements: HTMLElement[], observerId?: string) {
    let id = this._getObserverId(observerId);
    if (id) {
      for (let el of elements) {
        observers.get(id).observe(el, { subtree: true, childList: true });
      }
    } else {
      throw undefinedID;
    }
    return this;
  }

  private _getObserverId(id): string {
    if (observers.has(id)) {
      return id;
    } else if (observers.has(this._handlerKey)) {
      return this._handlerKey;
    } else {
      throw undefinedID;
    }
  }
  takeRecords(observerId: string) {
    const id = this._getObserverId(observerId),
      entries = observers.get(id).takeRecords();
    this._emitEntries.next({ id, entries });
    return this;
  }
  on(types: MutationRecordType | MutationRecordType[], observerId?: string) {
    const id = this._getObserverId(observerId);
    if (id) {
      if (!Array.isArray(types)) {
        types = [types];
      }
      return this._entryStream$.pipe(
        filter((entry) => entry.id === id),
        map((entry) => {
          return entry.entries.filter((entry) => {
            return types.includes(entry.type);
          });
        })
      );
    } else {
      throw undefinedID;
    }
  }
  use(id: string) {
    if (observers.has(id)) {
      this._handlerKey = id;
    } else {
      throw undefinedID;
    }
    return this;
  }
  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this._emitEntries = new ReplaySubject(1);
    this._entryStream$ = this._emitEntries.asObservable();
    this._emitter = (id: string) => {
      return function (this: MutationController, entries: MutationRecord[]) {
        return this._emitEntries.next({ id, entries });
      };
    };
  }

  initiate(observerId: string) {
    if (!observers.has(observerId)) {
      let observer = new MutationObserver(this._emitter(observerId).bind(this));
      observers.set(observerId, observer);
    }
    this._handlerKey = observerId;
    return this;
  }

  hostConnected() {
    this.host.requestUpdate();
  }
}
