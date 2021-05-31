import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

class StateStore {
  store = new BehaviorSubject({});
  listen = this.store.asObservable();
  updateState(newState: {}) {
    let update = produce(this.store.value, (draft: {}) => {
      return Object.assign(draft, newState);
    });
    this.store.next(update);
  }
}

export const state = new StateStore();
