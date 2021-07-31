import { Observable } from 'rxjs';
import { state } from '../../store';
import { ObservedStateAction } from '../../util/mixins/state-observer.mixin';
import { HicksResumeEntry } from './resume-entry.component';
export const resumeEntryObserver = {
  stream: state.filteredStream(['active-entry']) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      prop: 'active-entry',
      componentHandler(this: HicksResumeEntry, propValue) {
        this.isActive = propValue === this.entryId;
      },
    },
  ] as ObservedStateAction[],
};
