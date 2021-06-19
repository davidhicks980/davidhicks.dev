import produce from 'immer';
import { BehaviorSubject } from 'rxjs';

class StateStore {
  private store = new BehaviorSubject({});
  get listen() {
    return this.store.asObservable();
  }
  updateState(newState: { [key: string]: any }) {
    let update = produce(this.store.value, (draft: {}) => {
      return Object.assign(draft, newState);
    });
    this.store.next(update);
  }
}

export const state = new StateStore();

state.listen.subscribe(console.log);
