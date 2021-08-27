import { HicksResumeEntry } from './resume-entry.component';
import { mix } from '../../util/mixins/mix.with';
import { Observable } from 'rxjs';
import { state } from '../../util/functions/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';

export const resumeEntryObserver = {
  stream: state.filteredChanges([
    'active-entry',
    'app$showcv',
    'app$expand',

    '',
  ]) as Observable<Record<string, unknown>>,
  actions: [
    {
      property: 'active-entry',
      componentHandler(this: HicksResumeEntry, propValue) {
        this.isActive = propValue === this.entryId;
      },
    },
    {
      property: 'app$expand',
      componentHandler(this: HicksResumeEntry, propValue) {
        if (this.controllers?.expansion) {
          propValue
            ? this.controllers.expansion.collapse()
            : this.controllers.expansion.expand();
        }
      },
    },
    {
      property: 'app$showcv',
      componentHandler(this: HicksResumeEntry, propValue) {
        this.hidden = propValue === false ? !this.onResume : false;
        if (this.collapsed && this.controllers?.expansion) {
          this.controllers.expansion.collapse();
        }
      },
    },
  ] as ObservedStateAction[],
};
const e = mix(HicksResumeEntry).with(ObserveStateMixin(resumeEntryObserver));

customElements.define('hicks-resume-entry', e);
