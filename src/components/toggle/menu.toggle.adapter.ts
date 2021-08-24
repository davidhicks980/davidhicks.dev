import {
  state,
  storeKeys as StoreProperties,
} from '../../util/functions/store';
import { mix } from '../../util/mixins/mix.with';
import { EmitStateMixin } from '../../util/mixins/state-emitter.mixin';
import { HicksIconToggle } from './icon-toggle.component';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { Observable } from 'rxjs';
import { prefix, observedProperties } from './menu.toggle.properties';
import { TOCProperties } from '../toc/toc.properties';

//Table of contents
const emitActiveSection = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
};
export const MENU_TOGGLE_TAG_NAME = 'hicks-menu-toggle';
const action = {
  stream: state.filteredChanges([
    StoreProperties.BREAKPOINTS,
    TOCProperties.OPEN,
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      property: StoreProperties.BREAKPOINTS,
      componentHandler(this: HicksIconToggle, propValue) {
        if (!(propValue.get('mobile') || propValue.get('tablet'))) {
          this.toggled = false;
        }
      },
    },

    {
      property: TOCProperties.OPEN,
      componentHandler(this: HicksIconToggle, propValue: boolean) {
        if (this.toggled != propValue) {
          this.toggled = propValue;
        }
      },
    },
  ] as ObservedStateAction[],
};
export const MenuToggle = mix(HicksIconToggle).with(
  EmitStateMixin(emitActiveSection),
  ObserveStateMixin(action)
);
customElements.define(MENU_TOGGLE_TAG_NAME, MenuToggle);
