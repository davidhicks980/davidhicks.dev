import { Observable } from 'rxjs';
import { state } from '../../util/functions/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { mix } from '../../util/mixins/mix.with';
import { ContentModification, ContentTree } from './content.component';
import { PageSection } from '../../types/PageSection';
import { EmitStateMixin } from '../../util/mixins/state-emitter.mixin';
import { prefix, observedProperties } from './content.properties';
export const resumeEntryObserver = {
  stream: state.filteredChanges(['sectionAdditions']) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      property: 'sectionAdditions',
      componentHandler(
        this: ContentTree,
        propValue: {
          position: number;
          template: PageSection;
          change: ContentModification;
        }
      ) {
        const { position, template, change } = propValue;
        this.changeSections(position, change, template);
      },
    },
  ] as ObservedStateAction[],
};

const emitSectionChange = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
};
const e = mix(ContentTree).with(
  ObserveStateMixin(resumeEntryObserver),
  EmitStateMixin(emitSectionChange)
);

customElements.define('content-tree', e);
