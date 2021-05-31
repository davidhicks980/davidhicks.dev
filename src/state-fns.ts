import { state } from './store';

export const stateFunctions = new Map() as Map<
  string,
  (stateValue: string) => void
>;

export let listen = () =>
  state.listen.subscribe((state) => {
    let fn = (state: string) => {};
    const fnOfState = ([key, value]) => {
      if (stateFunctions.has(key)) {
        fn = stateFunctions.get(key);
        fn(value);
      } else
        throw new Error('[observers.listen] State function does not exist');
    };
    Object.entries(state).forEach(fnOfState);
  });
