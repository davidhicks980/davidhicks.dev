import {
  LitElement,
  html,
  CSSResultGroup,
  TemplateResult,
  nothing,
  svg,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { IntersectionController } from '../../util/controllers/intersection.controller';
import { style } from './resume-entry.css';
import { fastHash } from '../../util/primitives/salt-id';
import { state as stateStore } from '../../store';
import { mix } from '../../util/mixins/mix.with';
import { ObserveStateMixin } from '../../util/mixins/state-observer.mixin';
import { resumeEntryObserver } from './resume-entry.adapter';
import { ExpansionController } from '../../util/controllers/expansion.controller';

export class HicksResumeEntry extends LitElement {
  @property({ type: Boolean })
  onResume: boolean;
  @property({ type: Boolean })
  open: boolean;
  @property({ attribute: 'active', type: Boolean, reflect: true })
  isActive: boolean = false;
  @property({ attribute: 'entry-id', type: Number, reflect: true })
  entryId: number = 0;
  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;
  @property({ type: Number, reflect: true })
  index: number = 0;
  @state()
  mobile: boolean;

  breakpointControl: BreakpointController;
  controllers: {
    intersection: IntersectionController;
    breakpoint: BreakpointController;
    expansion: ExpansionController;
  };
  constructor() {
    super();
    this.entryId = Math.abs(
      fastHash('entry' + Math.floor(Math.random() * 10 ** 5))
    );
  }
  firstUpdated(_changedProperties) {
    this.controllers = {
      intersection: new IntersectionController(this),
      breakpoint: new BreakpointController(this),
      expansion: new ExpansionController(this),
    };
    this.controllers.breakpoint
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
    this.watchScroll();
    console.log(this.index);
  }
  watchScroll() {
    let margin = { top: '-49%', bottom: '-49%', left: '0px', right: '0px' },
      threshold = [0];
    const observe = this.controllers.intersection
      .initiate('resume-entry', null, threshold, margin)
      .observe([this as HTMLElement]);
    observe.on('entry').subscribe((entries: IntersectionObserverEntry[]) => {
      let entry = entries.filter((e) => e.isIntersecting)[0]
        ?.target as HicksResumeEntry;
      let id = entry?.entryId;
      if (id) stateStore.updateState({ 'active-entry': id });
    });
  }

  expandIco = (
    expanded
  ) => svg`<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/> 
    <rect class="expand__v"  y='4' x="11.075" width="1.85" height="16" />
    <rect class="expand__h"  y='11.075' x="4" width="16" height="1.85" />
</svg>`;
  render(): TemplateResult {
    return html`
      <div class="entry">
        <div class="entry__left">
          <div class="entry__date">
            <slot name="startDate"></slot> <slot name="endDate"></slot>
          </div>
        </div>
        <div class="entry__timeline"></div>
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
          ${this.expanded
            ? html`<p class="entry__description">
                  <slot name="description"></slot>
                </p>
                <ul class="entry__detail">
                  <slot name="detail"></slot>
                </ul>`
            : nothing}
        </div>
        <div class="entry__expand">
          <hicks-toggle-button
            aria-expanded="${this.expanded}"
            @click="${() => (this.expanded = !this.expanded)}"
            title="Expand"
            class="entry__expand__button"
          >
            ${this.expandIco(this.expanded)}
          </hicks-toggle-button>
        </div>
      </div>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
const e = mix(HicksResumeEntry).with(ObserveStateMixin(resumeEntryObserver));

customElements.define('hicks-resume-entry', e);
