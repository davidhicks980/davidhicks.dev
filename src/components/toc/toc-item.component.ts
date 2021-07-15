import { LitElement, html, TemplateResult } from 'lit';
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { style } from './tocitem.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
@customElement('hicks-list-item')
export class HicksListItem extends LitElement {
  @queryAssignedNodes('children', true, 'ul')
  childSlot: NodeListOf<HTMLUListElement>;
  @property({ type: Number, reflect: true })
  childItems: number = 0;
  @property({ type: String, reflect: true })
  path: string = '';
  @property({ type: String, reflect: true })
  href: string = '';
  @property({ type: Boolean, reflect: true })
  active: boolean = false;
  @property({ type: Boolean, reflect: true })
  shown: boolean = false;
  @property({ type: Boolean, reflect: true })
  locked: boolean = false;
  @property({ type: String, reflect: true })
  marker: string = '';
  @property({ type: Boolean, reflect: true })
  mobile: boolean = false;
  /**
   *The number of visible child elements on elements that come before this element and contain the same root
   *
   * @type {string}
   * @memberof HicksListItem
   */
  @property({ type: Number, reflect: true })
  offset: number = 0;

  @state()
  lastUpdated: DOMHighResTimeStamp = 0;
  activePath = '';

  root: string;
  appendageSlot = (name: string) => html`
    <div class="item__content__${name}">
      <slot name="${name}"></slot>
    </div>
  `;

  linkSlot = (href: string) => html` <a
    tabindex="0"
    class="item__content__link"
    href="#${href}"
  >
    <slot name="link"></slot>
  </a>`;
  childlistSlot = html`<slot name="children"></slot>`;
  breakpointController: BreakpointController;

  getSlottedList() {
    if (this.childSlot?.length > 0) {
      return this.childSlot[0];
    } else {
      return undefined;
    }
  }
  constructor() {
    super();
    this.tabIndex = 0;
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.breakpointController = new BreakpointController(this);
    this.breakpointController
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
    if (!this.path.includes('.')) {
      this.shown = true;
      this.locked = true;
    }
  }

  willUpdate(_changedProperties: Map<string, unknown>) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('offset')) {
      this.setCSSVar('--item--offset', this.offset);
    }
  }

  setCSSVar(name: string, value: string | number) {
    this.style.setProperty(name, String(value));
  }

  activate() {
    this.active = true;
  }
  deactivate() {
    this.active = false;
  }
  render(): TemplateResult {
    return html`<li class="item">
      <div class="item__content">
        ${this.appendageSlot('prefix')}${this.linkSlot(this.href)}
        ${this.appendageSlot('suffix')}
      </div>
      ${this.childlistSlot}
    </li> `;
  }
  static get styles() {
    return [style];
  }
}
