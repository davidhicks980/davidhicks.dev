import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { style } from './resume-entry.css';
//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
@customElement('hicks-resume-entry')
export class HicksResumeEntry extends LitElement {
  @property({ type: Boolean }) onResume: boolean;
  @property({ type: Boolean }) open: boolean;
  @state()
  mobile: boolean;
  breakpointControl: BreakpointController;

  firstUpdated(_changedProperties) {
    this.breakpointControl = new BreakpointController(this);
    this.breakpointControl
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
  }
  render(): TemplateResult {
    return html`
      <div class="entry">
        <div class="entry__left">
          <div class="entry__date">
            <slot name="startDate"></slot> <slot name="endDate"></slot>
          </div>
        </div>
        <div class="entry__right">
          <h4 class="entry__title">
            <slot name="title"></slot>
          </h4>
          <h5 class="entry__logistics">
            <slot name="organization"></slot>
            ·
            <slot name="locale"></slot>
          </h5>

          <h5 class="entry__supervisor">
            <slot name="supervisor"></slot>
          </h5>
          <p class="entry__description">
            <slot name="description"></slot>
          </p>
          <ul class="entry__detail">
            <slot name="detail"></slot>
          </ul>
        </div>
      </div>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
