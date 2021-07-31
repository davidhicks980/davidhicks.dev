import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const validateObj = (o: Object) => {
  if (typeof o === 'object' && o !== null) {
    return true;
  } else {
    throw new TypeError(
      `[validateObj] Object is not valid or does not contain properties`
    );
  }
};
class StateStore {
  store: BehaviorSubject<{ [key: string]: unknown }>;
  changes: BehaviorSubject<{}>;

  get stream() {
    return this.store.asObservable();
  }
  constructor() {
    this.store = new BehaviorSubject({});
    this.changes = new BehaviorSubject({});
  }
  getStateEmitted() {
    return this.updateState.bind(this);
  }
  filteredStream(filter: string[]): Observable<Record<string, unknown>> {
    //Probably not super scalable, but this function will not be used a lot
    return this.stream.pipe(
      map((state) => {
        return Object.entries(state)
          .filter(([key, val]) => filter.includes(key))
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
      })
    );
  }
  updateState(newState: { [key: string]: any }) {
    if (validateObj(newState)) {
      Object.keys(newState);
      const value = this.store.value;
      let update = produce(value, (draft: {}) => {
        return Object.assign(draft, newState);
      });
      this.store.next(update);
    }
  }
}

export const state = new StateStore();
