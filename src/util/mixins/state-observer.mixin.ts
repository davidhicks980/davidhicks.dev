import { LitElement } from 'lit';
import { Observable } from 'rxjs';

type Constructor<T = {}> = new (...args: any[]) => T;

type LitProto = Constructor<LitElement>;

export type ObservedStateAction = {
  property: string;
  componentHandler: (...args) => unknown;
};
const s_actionMap = Symbol();
//@ts-ignore
export function ObserveStateMixin(handler: {
  stream: Observable<Record<string, unknown>>;
  actions: ObservedStateAction[];
}) {
  return <T extends LitProto>(superClass: T) =>
    class extends superClass {
      [s_actionMap]: Map<string, (...args: any[]) => unknown>;
      constructor(...args: any[]) {
        super();
        const { actions, stream } = handler;
        this[s_actionMap] = new Map();
        actions.map(({ property: prop, componentHandler }) => {
          const handler = componentHandler.bind(this);
          this[s_actionMap].set(prop, handler);
        });

        stream.subscribe((observedProps: Record<string, unknown>) => {
          Object.entries(observedProps).forEach(([key, value]) => {
            if (key) this[s_actionMap].get(key)(value);
          });
        });
      }
    };
}
