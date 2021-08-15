import { LitElement } from 'lit';
import { Observable } from 'rxjs';

type Constructor<T = {}> = new (...args: any[]) => T;

type LitProto = Constructor<LitElement>;

export type ObservedStateAction = {
  property: string;
  componentHandler: (...args) => unknown;
};

export function ObserveStateMixin(handler: {
  stream: Observable<Record<string, unknown>>;
  actions: ObservedStateAction[];
}) {
  return <T extends LitProto>(superClass: T) =>
    class extends superClass {
      actionsMap: Map<string, (...args: any[]) => unknown>;
      constructor(...args: any[]) {
        super();
        const { actions, stream } = handler;
        this.actionsMap = new Map();
        actions.map(({ property: prop, componentHandler }) => {
          const handler = componentHandler.bind(this);
          this.actionsMap.set(prop, handler);
        });

        stream.subscribe((observedProps: Record<string, unknown>) => {
          Object.entries(observedProps).forEach(([key, value]) => {
            if (key) this.actionsMap.get(key)(value);
          });
        });
      }
    };
}
