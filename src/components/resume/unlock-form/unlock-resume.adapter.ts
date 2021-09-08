import { mix } from '../../../util/mixins/mix.with';
import { state } from '../../../util/functions/store';
import {
  EmitStateMixin,
  StateHandler,
} from '../../../util/mixins/state-emitter.mixin';
import { UnlockResumeElement } from './unlock-resume.component';
import { observedProperties, prefix } from './unlock-resume.properties';
const hookedProperties = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
} as StateHandler;

const StatefulUnlockResumeElement = mix(UnlockResumeElement).with(
  EmitStateMixin(hookedProperties)
);

customElements.define('hicks-resume-entry', StatefulUnlockResumeElement);
