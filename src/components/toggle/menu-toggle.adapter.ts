import {
  state,
  storeKeys as StoreProperties,
} from '../../util/primitives/store';
import { mix } from '../../util/mixins/mix.with';
import { EmitStateMixin } from '../../util/mixins/state-emitter.mixin';
import { HicksToggle } from './toggle.component';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { Observable } from 'rxjs';
import { prefix, observedProperties } from './menu-toggle.properties';
import { TOCProperties } from '../toc/toc.properties';

//Table of contents
const emitActiveSection = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
};
export const action = {
  stream: state.filteredChanges([
    StoreProperties.BREAKPOINTS,
    TOCProperties.ACTIVE_SECTION,
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      property: StoreProperties.BREAKPOINTS,
      componentHandler(this: HicksToggle, propValue) {
        if (!(propValue.get('mobile') || propValue.get('tablet'))) {
          this.toggled = false;
        }
      },
    },
    {
      property: TOCProperties.ACTIVE_SECTION,
      componentHandler(this: HicksToggle, propValue: string) {
        this.toggled = false;
      },
    },
  ] as ObservedStateAction[],
};
const toc = mix(HicksToggle).with(
  EmitStateMixin(emitActiveSection),
  ObserveStateMixin(action)
);
customElements.define('hicks-menu-toggle', toc);
