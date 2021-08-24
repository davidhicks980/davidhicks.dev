import { state } from '../../util/functions/store';
import { mix } from '../../util/mixins/mix.with';
import { EmitStateMixin } from '../../util/mixins/state-emitter.mixin';
import { observedProperties, prefix } from './header.properties';
import { HicksHeader } from './header.component';

const emitHeaderChange = {
  propertyChangeHandler: state.hookPropertyUpdates(),
  observedProperties,
  prefix,
};
const header = mix(HicksHeader).with(EmitStateMixin(emitHeaderChange));

customElements.define('hicks-header', header);
