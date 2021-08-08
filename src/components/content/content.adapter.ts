import { Observable } from 'rxjs';
import { state } from '../../util/primitives/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { mix } from '../../util/mixins/mix.with';
import { ContentTree } from './content.component';
import { PageSection } from './PageSection';
export const resumeEntryObserver = {
  stream: state.filteredStream([
    'pageOutline',
    'sectionAdditions',
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      prop: 'pageOutline',
      componentHandler(this: ContentTree, propValue: PageSection[]) {
        this.load(propValue);
      },
    },
    {
      prop: 'sectionAdditions',
      componentHandler(
        this: ContentTree,
        propValue: { position: number; template: PageSection[] }
      ) {
        this.updateSection(propValue.position, propValue.template);
      },
    },
  ] as ObservedStateAction[],
};

const e = mix(ContentTree).with(ObserveStateMixin(resumeEntryObserver));

customElements.define('content-tree', e);
