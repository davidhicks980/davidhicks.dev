import { state } from '../../util/primitives/store';
import { mix } from '../../util/mixins/mix.with';
import { stateEmitterMixin } from '../../util/mixins/state-emitter.mixin';
import { TableOfContents } from './toc.component';
import { Observable } from 'rxjs';
import { ToggleProperties } from '../toggle/toggle.component';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { TOCProperties } from './TableOfContentsProperties.enum';

//Table of contents
const emitActiveSection = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties: [TOCProperties.ACTIVE_SECTION, TOCProperties.OPEN],
};
const changeSectionTitle = {
  stream: state.filteredStream([ToggleProperties.TOGGLED]) as Observable<
    Record<string, boolean>
  >,
  actions: [
    {
      prop: ToggleProperties.TOGGLED,
      componentHandler(this: TableOfContents, propValue: boolean) {
        this.open = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const toc = mix(TableOfContents).with(
  stateEmitterMixin(emitActiveSection),
  ObserveStateMixin(changeSectionTitle)
);
customElements.define('hicks-toc', toc);
