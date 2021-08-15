import produce, {
  enableMapSet,
  enablePatches,
  produceWithPatches,
} from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clone } from '../../components/content/deep-clone';
import { documentBreakpoints } from './breakpoint-emitter.component';
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

  get changes() {
    return this._changes.asObservable();
  }
  get store() {
    return this._store.asObservable();
  }
  constructor() {
    this._changes = new BehaviorSubject({});
    this._store = new BehaviorSubject({});
  }
  hookPropertyUpdates() {
    return this.update.bind(this);
  }
  private _filterSubject(
    property: string,
    filter: string[]
  ): Observable<Record<string, unknown>> {
    return this[property].pipe(
      map((state) => {
        return Object.entries(state)
          .filter(([key]) => filter.includes(key))
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
      })
    );
  }
  filteredChanges(filter: string[]): Observable<Record<string, unknown>> {
    return this._filterSubject('_changes', filter);
  }
  filteredStore(filter: string[]): Observable<Record<string, unknown>> {
    return this._filterSubject('_store', filter);
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
    }
  }
}

export const state = new StateStore();
export const storeKeys = { BREAKPOINTS: 'store$breakpointMatches' };
documentBreakpoints.observeAllMatches$.subscribe((matches) => {
  state.update({ store$breakpointMatches: matches });
});
