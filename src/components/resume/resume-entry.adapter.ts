import { HicksResumeEntry } from './resume-entry.component';
import { mix } from '../../util/mixins/mix.with';
import { Observable } from 'rxjs';
import { state } from '../../util/functions/store';
import {
  ObservedStateAction,
  ObserveStateMixin,
} from '../../util/mixins/state-observer.mixin';
import { GlobalResumeProperties } from '../../util/functions/global-state-entries';

const { SHOW_CV, EXPAND_STATE } = GlobalResumeProperties;

export const resumeEntryObserver = {
  stream: state.filteredChanges([SHOW_CV, EXPAND_STATE]) as Observable<
    Record<string, unknown>
  >,
  actions: [
    {
      property: EXPAND_STATE,
      componentHandler(this: HicksResumeEntry, propValue) {
        if (this.controllers?.expansion) {
          propValue
            ? this.controllers.expansion.collapse()
            : this.controllers.expansion.expand();
        }
      },
    },
    {
      property: SHOW_CV,
      componentHandler(this: HicksResumeEntry, propValue) {
        this.hidden = propValue === false ? !this.onResume : false;
        if (this.collapsed && this.controllers?.expansion) {
          this.controllers.expansion.collapse();
        }
      },
    },
  ] as ObservedStateAction[],
};
const StatefulResumeEntryElement = mix(HicksResumeEntry).with(
  ObserveStateMixin(resumeEntryObserver)
);

customElements.define('hicks-resume-entry', StatefulResumeEntryElement);
