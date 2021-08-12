import { fastHash } from '../../util/primitives/salt-id';
import { state as stateStore } from '../../util/primitives/store';
import { CollapseController } from '../../util/controllers/expansion.controller';
import { LitElement, html, CSSResultGroup, TemplateResult, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { IntersectionController } from '../../util/controllers/intersection.controller';
import { style } from './resume-entry.css';

export class HicksResumeEntry extends LitElement {
  @property({ type: Boolean })
  onResume: boolean;
  @property({ type: Boolean })
  open: boolean;
  @property({ attribute: 'active', type: Boolean, reflect: true })
  isActive: boolean = false;
  @property({ attribute: 'entry-id', type: Number })
  entryId: number = 0;
  @property({ type: Boolean })
  collapsed;
  @state()
  mobile: boolean;
  @query('.entry__expansion', true)
  collapsingPanel: HTMLElement;

  declare controllers: {
    intersection: IntersectionController;
    breakpoint: BreakpointController;
    expansion: CollapseController;
  };

  constructor() {
    super();
    this.entryId = Math.abs(
      fastHash('entry' + Math.floor(Math.random() * 10 ** 5))
    );
  }
  firstUpdated(_changedProperties) {
    this.collapsed = true;
    let root = document.getElementsByTagName('content-tree')[0] as HTMLElement;

    console.log(this.shadowRoot.querySelector('.entry__expansion'));
    this.controllers = {
      intersection: new IntersectionController(this),
      breakpoint: new BreakpointController(this),
      expansion: new CollapseController(
        this,
        'resume-entries',
        root,
        this.collapsingPanel
      ),
    };
    this.controllers.breakpoint
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
    this.watchScroll();
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
      if (id) {
        stateStore.update({ 'active-entry': id });
      }
    });
  }

  expandIcon(collapsed) {
    return svg`<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/> 
    <rect class="expand__v"  y='4' x="11.075" width="1.85" height="16" />
    <rect class="expand__h"  y='11.075' x="4" width="16" height="1.85" />
</svg>`;
  }

  updateOffset() {
    this.controllers.expansion.updateOffset();
  }
  toggle() {
    this.controllers.expansion.toggle();
  }
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
          <h4 @click=${this.toggle} class="entry__title">
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

          <div class="entry__expansion">
            <p class="entry__description">
              <slot
                @slotchange="${this.updateOffset}"
                name="description"
              ></slot>
            </p>
            <ul class="entry__detail">
              <slot @slotchange="${this.updateOffset}" name="detail"></slot>
            </ul>
          </div>
        </div>
        <div class="entry__expand">
          <hicks-expansion-toggle
            aria-expanded="${!this.collapsed}"
            @click="${this.toggle}"
            title="Expand"
            class="entry__expand__button"
          >
            ${this.expandIcon(!this.collapsed)}
          </hicks-expansion-toggle>
        </div>
      </div>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
