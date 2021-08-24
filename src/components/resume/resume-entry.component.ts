import { fastHash } from '../../util/functions/salt-id';
import { state as stateStore } from '../../util/functions/store';
import { CollapseController } from '../../util/controllers/expansion.controller';
import { LitElement, html, CSSResultGroup, TemplateResult, svg } from 'lit';
import { property, query, queryAsync } from 'lit/decorators.js';
import {
  IntersectionController,
  IntersectionObserverType,
} from '../../util/controllers/intersection.controller';
import { style } from './resume-entry.css';
import '../toggle/expansion.toggle.adapter';

export class HicksResumeEntry extends LitElement {
  @property({ attribute: 'on-resume', type: Boolean })
  onResume: boolean;
  @property({ type: Boolean })
  hidden: boolean;

  @property({ attribute: 'active', type: Boolean, reflect: true })
  isActive: boolean = false;
  @property({ attribute: 'entry-id', type: Number })
  entryId: number = 0;
  @property({ type: Boolean, reflect: true })
  collapsed: boolean;
  @property({ type: Boolean, reflect: true })
  mobile: boolean;
  @queryAsync('.entry__expansion')
  onPanelLoad: Promise<HTMLElement>;
  @query('.entry__expansion', true)
  collapsingPanel: HTMLElement;

  declare controllers: {
    intersection: IntersectionController;
    expansion: CollapseController;
  };
  panelLoaded: boolean = false;

  constructor() {
    super();
    this.entryId = Math.abs(
      fastHash('entry' + Math.floor(Math.random() * 10 ** 5))
    );
  }
  firstUpdated(_changedProperties) {
    this.collapsed = true;
    let root = document.getElementsByTagName('content-tree')[0] as HTMLElement;

    this.controllers = {
      intersection: new IntersectionController(this),
      expansion: new CollapseController(
        this,
        'resume-entries',
        root,
        this.collapsingPanel
      ),
    };

    this.watchScroll();
    this.onPanelLoad.then((panel) => {
      let height = panel.offsetHeight;
      this.style.marginBottom = -1 * height + 'px';
      this.controllers.expansion.collapsed = true;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent('resumeload', { bubbles: true, composed: true })
    );
  }
  watchScroll() {
    let margin = { top: '-49%', bottom: '-49%', left: '0px', right: '0px' },
      threshold = [0];
    const observe = this.controllers.intersection
      .initiate('resume-entry', null, threshold, margin)
      .observe([this as HTMLElement]);
    observe
      .on(IntersectionObserverType.INTERSECTING)
      .subscribe((entries: IntersectionObserverEntry[]) => {
        let entry = entries[0]?.target as HicksResumeEntry;
        let id = entry?.entryId;
        if (id) {
          stateStore.update({ 'active-entry': id });
        }
      });
  }

  expandIcon = svg`<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/> 
    <rect class="expand__v"  y='4' x="11.075" width="1.85" height="16" />
    <rect class="expand__h"  y='11.075' x="4" width="16" height="1.85" />
</svg>`;

  updateOffset() {
    this.controllers.expansion.updateOffset();
  }
  toggle() {
    this.controllers.expansion.toggle();
  }
  expand() {
    this.controllers.expansion.expand();
  }
  collapse() {
    this.controllers.expansion.collapse();
  }
  render(): TemplateResult {
    if (this.hidden) {
      this.style.marginBottom = '0px';
      return;
    }
    return html`
      <div class="entry">
        <div class="entry__left">
          <div class="entry__date">
            <div><slot name="endDate"></slot></div>
            <div><slot name="startDate"></slot></div>
          </div>
        </div>
        <div class="entry__timeline"></div>
        <div class="entry__right">
          <h4 @click=${this.toggle} class="entry__name">
            <slot name="name"></slot>
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
            ${this.expandIcon}
          </hicks-expansion-toggle>
        </div>
      </div>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
