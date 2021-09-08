import { enableMapSet, enablePatches, produceWithPatches } from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { clone } from '../../components/content/deep-clone';
import { documentBreakpoints } from './breakpoint-emitter.component';
import { GlobalBreakpointProperties } from './global-state-entries';
const validateObj = (o: Object) => {
  if (typeof o === 'object' && o !== null) {
    return true;
  } else {
    throw new TypeError(
      `[validateObj] Object is not valid or does not contain properties`
    );
  }
};
enablePatches();
enableMapSet();
class StateStore {
  private _changes: BehaviorSubject<{ [key: string]: unknown }>;
  private _store: BehaviorSubject<{ [key: string]: unknown }>;
  private changes$: Observable<Record<string, any>>;
  private store$: Observable<Record<string, any>>;

  constructor() {
    this._changes = new BehaviorSubject({});
    this._store = new BehaviorSubject({});
    [this.changes$, this.store$] = [this._changes, this._store].map((sub) =>
      sub.asObservable().pipe(map((state) => Array.from(Object.entries(state))))
    );
  }
  hookPropertyUpdates() {
    return this.update.bind(this);
  }
  private _filterSubject(
    property: string,
    filters: string[]
  ): Observable<Record<string, unknown>> {
    return this[property].pipe(
      filter((state: [string, any][]) =>
        state.some(([key, value]) => filters.includes(key))
      ),
      map((state: [string, any][]) => {
        return state.reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      })
    );
  }
  filteredChanges(filter: string[]): Observable<Record<string, unknown>> {
    return this._filterSubject('changes$', filter);
  }
  filteredStore(filter: string[]): Observable<Record<string, unknown>> {
    return this._filterSubject('store$', filter);
  }
  update(stateUpdate: { [key: string]: any }) {
    if (validateObj(stateUpdate)) {
      const value = this._store.value;
      const [nextState, patches, _] = produceWithPatches(value, (draft: {}) => {
        Object.assign(draft, stateUpdate);
      });
      if (patches.length) {
        this._store.next(nextState);
        this._changes.next(clone(stateUpdate));
      }
    } else {
      throw Error('Provided stateUpdate is not an object!');
    }
  }
}

export const state = new StateStore();
documentBreakpoints.observeAllMatches$.subscribe((matches) => {
  state.update({ [GlobalBreakpointProperties.MATCHES]: matches });
});
