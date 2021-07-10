import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { property, queryAssignedNodes, state } from 'lit/decorators.js';
import { style } from './tocitem.css';
import { ListItemController } from '../../../util/controllers/item.controller';
import { HicksList } from './hicks-list';

export class what extends LitElement {
  @queryAssignedNodes('children', true)
  childSlot: NodeListOf<HicksList>;
  @property({ type: Number, reflect: true })
  public get childCount(): number {
    return this.childSlot[0].childElementCount;
  }

  @property({ type: Number, reflect: true })
  index: number = 0;
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

  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;

  @property({ type: String, reflect: true })
  marker: string = '';

  @state()
  lastUpdated: DOMHighResTimeStamp = 0;
  activePath = '';
  itemController: ListItemController = new ListItemController(this);

  root: string;
  suffixSlot = html`
    <div @click="${this.handleSuffixClick}" class="item__content__suffix">
      <slot name="suffix"></slot>
    </div>
  `;
  prefixSlot = html`
    <div class="item__content__prefix">
      <slot name="prefix"></slot>
    </div>
  `;
  contentSlot = (href) => html` <a class="item__content__link" href="#${href}">
    <slot name="link"></slot>
  </a>`;
  childlistSlot = html`<slot name="children"></slot>`;

  handleSuffixClick() {
    this.childList.expanded = true;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.path.includes('.')) {
      this.shown = true;
      this.locked = true;
    }
  }

  get childList(): HicksList {
    if (this.childSlot) {
      let predicate = (el: HTMLElement) =>
        el.classList.contains('list__sublist');
      return Array.from(this.childSlot).filter(predicate)[0];
    }
  }

  render(): TemplateResult {
    return html`<li class="item">
      <div class="item__content">
        ${this.suffixSlot} ${this.prefixSlot} ${this.contentSlot(this.href)}
      </div>
      ${this.childlistSlot}
    </li> `;
  }

  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
