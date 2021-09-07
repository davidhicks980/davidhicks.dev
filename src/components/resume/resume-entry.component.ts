import { fastHash } from '../../util/functions/salt-id';
import { state as stateStore } from '../../util/functions/store';
import { CollapseController } from '../../util/controllers/expansion.controller';
import {
  LitElement,
  html,
  CSSResultGroup,
  TemplateResult,
  svg,
  PropertyValues,
} from 'lit';
import {
  property,
  query,
  queryAssignedNodes,
  queryAsync,
} from 'lit/decorators.js';
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

  @queryAsync('.entry__expansion')
  onPanelLoad!: Promise<HTMLElement>;
  @query('.entry__expansion')
  collapsingPanel!: HTMLElement;
  @queryAssignedNodes('endDate', true)
  endDate;
  @property({ attribute: 'active', type: Boolean, reflect: true })
  isActive = false;
  @property({ attribute: 'entry-id', type: Number })
  entryId = 0;
  @property({ type: String })
  root!: string;
  @property({ type: Boolean, reflect: true })
  collapsed: boolean;

  declare controllers: {
    intersection: IntersectionController;
    expansion: CollapseController;
  };
  panelLoaded = false;
  multipleDates: boolean;

  constructor() {
    super();
    this.entryId = Math.abs(
      fastHash('entry' + Math.floor(Math.random() * 10 ** 5))
    );
    this.collapsed = true;
  }
  firstUpdated(_changedProperties: PropertyValues) {
    const root = document.querySelector(this.root) as HTMLElement;

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
    this.controllers.expansion.collapse();
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent('resumeload', { bubbles: true, composed: true })
    );
  }
  updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('hidden')) {
      if (this.hidden === false) {
        this.controllers.expansion.collapsingPanel = this.collapsingPanel;
      }
    }
  }
  watchScroll() {
    const margin = { top: '-49%', bottom: '-49%', left: '0px', right: '0px' },
      threshold = [0];
    const observe = this.controllers.intersection
      .initiate('resume-entry', null, threshold, margin)
      .observe([this as HTMLElement]);

    observe
      .on(IntersectionObserverType.INTERSECTING)
      .subscribe((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0]?.target as HicksResumeEntry;
        const id = entry?.entryId;
        if (id) {
          stateStore.update({ 'active-entry': id });
        }
      });
  }

  expandIcon = svg`<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/> 
    <rect class="expand__v"  y='4' x="11.075" width="1.85" height="16" />
    <rect class="expand__h"  y='11.075' x="4" width="16" height="1.85" />
</svg>`;

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
      return html``;
    }
    return html`
      <div class="entry">
        <div class="entry__date">
          <span><slot name="startDate"></slot></span>
          ${this.endDate?.length
            ? html`<span class="separator__dates">·</span>`
            : ''}
          <span><slot name="endDate"></slot></span>
        </div>
        <div class="entry__timeline"></div>
        <div class="entry__content">
          <h4 @click=${this.toggle} class="entry__name">
            <slot name="name"></slot>
          </h4>
          <h5 class="entry__logistics">
            <slot name="organization"></slot>
            <span class="separator">·</span>
            <slot name="locale"></slot>
          </h5>

          <h5 class="entry__supervisor">
            <slot name="supervisor"></slot>
          </h5>

          <div class="entry__expansion">
            <p class="entry__description">
              <slot name="description"></slot>
            </p>
            <ul class="entry__detail">
              <slot name="detail"></slot>
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
