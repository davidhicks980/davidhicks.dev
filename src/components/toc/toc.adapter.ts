import { state } from '../../util/primitives/store';
import { mix } from '../../util/mixins/mix.with';
import { EmitStateMixin } from '../../util/mixins/state-emitter.mixin';
import { TableOfContents } from './toc.component';
import { Observable } from 'rxjs';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { observedProperties, prefix } from './toc.properties';
import { ToggleProperties } from '../toggle/menu-toggle.properties';

//Table of contents
const emitActiveSection = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
};
const observeToggle = {
  stream: state.filteredChanges([ToggleProperties.TOGGLED]) as Observable<
    Record<string, boolean>
  >,
  actions: [
    {
      property: ToggleProperties.TOGGLED,
      componentHandler(this: TableOfContents, propValue: boolean) {
        this.open = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const toc = mix(TableOfContents).with(
  EmitStateMixin(emitActiveSection),
  ObserveStateMixin(observeToggle)
);
customElements.define('hicks-toc', toc);
