import { _BreakpointController } from '../controllers/_breakpoint.controller';
import { MediaQueryCallback } from '../../MediaQueryCallback';
import { LitProto } from '../../types/LitProto';
import { PropertyChanges } from '../../types/PropertyChanges';

export type Constructor<T = {}> = new (...args: any[]) => T;

export function ObservePropertiesMixin(changeHandler: PropertyChanges[]) {
  return <T extends LitProto>(superClass: T) =>
    class extends superClass {
      breakpointControl = new _BreakpointController(this);

      constructor(...args: any[]) {
        super();
      }
      firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);

        //If a query is matched, run the associated actions specified when defining the mixin;
        changeHandler.forEach(({ query, action }) => {
          //Bind this to use the component context within callbacks;
          const boundAction = action.bind(this);

          const callback: MediaQueryCallback = (e: MediaQueryListEvent) =>
            boundAction(e.matches);

          this.breakpointControl.observeBreakpoint(query, callback);
        });
      }
    };
}
