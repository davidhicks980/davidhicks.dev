import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;
type LitProto = Constructor<LitElement>;

export type StateHandler = {
  propertyChangeHandler: (property: Record<string, unknown>) => void;
  observedProperties: string[];
  prefix: string;
};

/**
 * Emits provides a mixin that will emit internal property value changes
 *
 * @export
 * @param {StateHandler} state - Contains the function you wish to call after a property is updated, the property names, and the specific component prefix
 * @example
 * ```
 * //Define handler
 * const buttonHandler = {
 *  propertyChangeHandler: (property: {clicked: boolean}) => state.emit(property)
 *  observedProperties: ['clicked']
 *  prefix: 'button'
 * }
 * //Mix handler in with your base component
 * class StatefulButton extends mix(ButtonComponent).with(EmitStateMixin(buttonHandler)){
 * ...
 * }
 * //Filter state updates for the property you wish to observe
 * stateUpdates.pipe(
 *  pluck('button$clicked')
 * )
 * .subscribe((update){
 *  ...do something...
 * })
 * ```
 * @returns mixin that emits state properties
 */
export function EmitStateMixin(state: StateHandler) {
  return <T extends LitProto>(superClass: T) =>
    class extends superClass {
      _propertyHandler;
      _properties: string[];
      _prefix: string;

      constructor(...args: any[]) {
        super();
        this._propertyHandler = state.propertyChangeHandler;
        this._properties = state.observedProperties;
        this._prefix = state.prefix;
      }

      updated(_changedProperties: Map<string, unknown>) {
        super.updated(_changedProperties);
        const { _properties: props, _propertyHandler, _prefix: prefix } = this;
        //If observed properties are not listed, include all properties. Otherwise, emit properties that are observed.
        //_changedProperties lists property values before they are changed, not after. This is why the property handler
        Array.from(_changedProperties)
          .filter(([key, value]) => {
            return (
              value !== undefined && (props.length === 0 || props.includes(key))
            );
          })
          .forEach(([key, _]) =>
            //@ts-ignore
            _propertyHandler({ [prefix + '$' + key]: this[key as string] })
          );
      }
    };
}
