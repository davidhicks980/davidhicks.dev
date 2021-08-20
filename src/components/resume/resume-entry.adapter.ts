import { HicksResumeEntry } from './resume-entry.component';
import { mix } from '../../util/mixins/mix.with';
import { Observable } from 'rxjs';
import { state } from '../../util/primitives/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';

export const resumeEntryObserver = {
  stream: state.filteredChanges([
    'active-entry',
    'show-resume-entries',
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      property: 'active-entry',
      componentHandler(this: HicksResumeEntry, propValue) {
        this.isActive = propValue === this.entryId;
      },
    },
    {
      property: 'show-resume-entries',
      componentHandler(this: HicksResumeEntry, propValue) {
        propValue
          ? this.controllers.expansion.collapse()
          : this.controllers.expansion.expand();
      },
    },
  ] as ObservedStateAction[],
};
const e = mix(HicksResumeEntry).with(ObserveStateMixin(resumeEntryObserver));

customElements.define('hicks-resume-entry', e);
