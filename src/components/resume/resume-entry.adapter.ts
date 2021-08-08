import { HicksResumeEntry } from './resume-entry.component';
import { mix } from '../../util/mixins/mix.with';
import { Observable } from 'rxjs';
import { state } from '../../util/primitives/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
export const resumeEntryObserver = {
  stream: state.filteredStream([
    'active-entry',
    'show-resume-entries',
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      prop: 'active-entry',
      componentHandler(this: HicksResumeEntry, propValue) {
        this.isActive = propValue === this.entryId;
      },
    },
    {
      prop: 'show-resume-entries',
      componentHandler(this: HicksResumeEntry, propValue) {
        if (
          propValue === true &&
          this.dataset.collapsed != (null || undefined)
        ) {
          this.toggleAttribute('data-collapsed', false);
        } else if (propValue === false && !this.dataset.collapsed) {
          this.toggleAttribute('data-collapsed', true);
        }
      },
    },
  ] as ObservedStateAction[],
};
const e = mix(HicksResumeEntry).with(ObserveStateMixin(resumeEntryObserver));

customElements.define('hicks-resume-entry', e);
