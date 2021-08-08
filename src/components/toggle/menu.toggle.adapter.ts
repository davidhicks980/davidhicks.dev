import { TOCProperties } from '../toc/TableOfContentsProperties.enum';

import { state } from '../../util/primitives/store';
import { mix } from '../../util/mixins/mix.with';
import { stateEmitterMixin } from '../../util/mixins/state-emitter.mixin';
import { HicksToggle } from './toggle.component';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { Observable } from 'rxjs';

export enum ToggleProperties {
  TOGGLED = 'toggled',
}
//Table of contents
const emitActiveSection = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties: [ToggleProperties.TOGGLED],
};
export const action = {
  stream: state.filteredStream([TOCProperties.OPEN]) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      prop: TOCProperties.OPEN,
      componentHandler(this: HicksToggle, propValue) {
        this.toggled = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const toc = mix(HicksToggle).with(
  stateEmitterMixin(emitActiveSection),
  ObserveStateMixin(action)
);
customElements.define('hicks-menu-toggle', toc);
