import { HicksHeader } from './header.component';
import { state } from '../../util/primitives/store';
import { Observable } from 'rxjs';
import { mix } from '../../util/mixins/mix.with';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { TOCProperties } from '../toc/toc.properties';

const changeSectionTitle = {
  stream: state.filteredChanges([TOCProperties.ACTIVE_SECTION]) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      property: TOCProperties.ACTIVE_SECTION,
      componentHandler(this: HicksHeader, propValue: string) {
        this.sectionTitle = propValue;
      },
    },
  ] as ObservedStateAction[],
};
const header = mix(HicksHeader).with(ObserveStateMixin(changeSectionTitle));
customElements.define('hicks-header', header);
