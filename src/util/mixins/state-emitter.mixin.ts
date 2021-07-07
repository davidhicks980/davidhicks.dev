import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;
type StateHandler = {
  propertyChangeHandler: (property: Record<string, unknown>) => void;
  observedProperties: string[];
};

type LitProto = Constructor<LitElement>;

export function stateEmitterMixin(state: StateHandler) {
  return <T extends LitProto>(superClass: T) =>
    class extends superClass {
      private _propertyHandler;
      private _properties: string[];

      constructor(...args: any[]) {
        super();
        this._propertyHandler = state.propertyChangeHandler;
        this._properties = state.observedProperties;
      }

      updated(_changedProperties: Map<string, unknown>) {
        super.updated(_changedProperties);
        const { _properties: props, _propertyHandler } = this;
        //If observed properties are not listed, include all properties. Otherwise, emit properties that are observed.
        //_changedProperties lists property values before they are changed, not after. This is why the property handler
        Array.from(_changedProperties)
          .filter(
            ([key, value]) =>
              value !== undefined && (props.length === 0 || props.includes(key))
          )
          .forEach(([key, _]) => _propertyHandler({ [key]: this[key] }));
      }
    };
}
