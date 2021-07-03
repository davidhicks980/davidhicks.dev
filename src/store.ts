import produce from 'immer';
import { BehaviorSubject } from 'rxjs';
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
  get listen() {
    return this.store.asObservable();
  }
  constructor() {
    this.store = new BehaviorSubject({});
  }
  getStateFn() {
    return this.updateState.bind(this);
  }
  updateState(newState: { [key: string]: any }) {
    if (validateObj(newState)) {
      const value = this.store.value;
      let update = produce(value, (draft: {}) => {
        return Object.assign(draft, newState);
      });
      this.store.next(update);
    }
  }
}

export const state = new StateStore();
state.listen.subscribe(console.log);
