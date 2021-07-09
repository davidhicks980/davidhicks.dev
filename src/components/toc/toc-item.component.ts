import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { property, queryAssignedNodes, state } from 'lit/decorators.js';
import { style } from './tocitem.css';
//import { styleMap } from 'lit/directives/style-map.js'
//import { classMap } from 'lit/directives/class-map.js'
import { ListItemController } from '../../util/controllers/table-of-contents.controller';

export class HicksItemComponent extends LitElement {
  @queryAssignedNodes('children')
  childSlot: NodeListOf<HTMLUListElement>;
  @property({ type: Number, reflect: true })
  childCount: number = 0;
  @property({ type: Number, reflect: true })
  totalChildCount: number = 0;
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
  @property({ type: String })
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
  childlistSlot = html`<slot
    @sectionchange="${this.handleSectionChange}"
    name="children"
  ></slot>`;

  handleSuffixClick() {
    this.shown != this.shown;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.path.includes('.')) {
      this.shown = true;
      this.locked = true;
    }
    this.itemController = new ListItemController(this);

    const update = this.updateOffset.bind(this);
    this.activePath = this.path.slice();
    this.itemController.observeOffset(this.activePath, update);
  }
  updateOffset(offset: number) {
    this.style.setProperty('--item--offset', String(offset));
  }
  handleSectionChange(event: CustomEvent<{ path: string; isActive: boolean }>) {
    const { detail, timeStamp } = event;
    if (detail.path.includes(this.path) && timeStamp > this.lastUpdated) {
      this.totalChildCount = event
        .composedPath()
        .filter((el: HTMLElement) => {
          return (
            el &&
            el.tagName === 'UL' &&
            el.hasAttribute('data-expanded-list') &&
            el.hasAttribute('data-position') &&
            this.path.length < el.dataset.position.length
          );
        })
        .reduce((count, el: HTMLUListElement) => {
          return count + el.childElementCount;
        }, 0);
      this.shown = detail.isActive;
      this.lastUpdated = timeStamp;
      this.childList?.toggleAttribute('data-expanded-list', detail.isActive);
      Array.from(this.childList.children).forEach(
        (element: HicksItemComponent) => {
          element.shown = true;
        }
      );
    }
  }
  get childList(): HTMLUListElement {
    if (this.childSlot) {
      let predicate = (el: HTMLElement) =>
        el.classList.contains('list__sublist');
      return Array.from(this.childSlot).filter(predicate)[0];
    }
  }
  willUpdate(_changedProperties: Map<string, unknown>) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('expanded')) {
      if (this.expanded) {
        this.shown = true;
      }
    }
    if (_changedProperties.has('active')) {
      this.shown = this.active;
    }
    if (_changedProperties.has('index')) {
      this.style.setProperty('--item--index', this.index.toString());
    }
  }

  emitSectionChangeEvent() {
    const sectionChange = new CustomEvent('sectionchange', {
      detail: { path: this.path, isActive: this.active },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(sectionChange);
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
