import { LitElement, nothing, TemplateResult } from 'lit';
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { style } from './toc-item.css';
import { literal, html } from 'lit/static-html.js';

import { ListItemController } from '../../util/controllers/item.controller';

export const LIST_ITEM_TAG_NAME = 'hicks-list-item';
@customElement(LIST_ITEM_TAG_NAME)
export class HicksListItem extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  private _path = '';
  private _position: number[] = [0];

  @queryAssignedNodes('', true, LIST_ITEM_TAG_NAME)
  childSlot: NodeListOf<HicksListItem>;
  @property({ type: Number, reflect: true })
  listChildren = 0;
  @property({ type: Boolean, reflect: true })
  active = false;
  @property({ type: Boolean, reflect: true })
  hidden = false;
  @property({ type: Boolean, reflect: true })
  expanded = false;
  @property({ type: String })
  marker = '';
  @property({ type: Boolean, reflect: true })
  mobile = false;
  controllers: { item: ListItemController };
  @property({ attribute: 'top-level', type: Boolean, reflect: true })
  topLevel: boolean;
  @state()
  get position(): number[] {
    return this._position;
  }
  @property({ reflect: true })
  get root(): string {
    return this._position.slice(0, -1).join('.');
  }
  @state()
  get index(): number {
    return this._position[this._position.length - 1];
  }
  @property({ type: String, reflect: true })
  get path(): string {
    return this._path;
  }
  set path(value: string) {
    this._position = value.split('.').map((el) => parseInt(el, 10));
    this._path = value;
  }
  @property({ type: String, reflect: true })
  link = '';

  get hasListChildren() {
    return this.listChildren > 0;
  }

  refreshChildren() {
    this.listChildren = this.childSlot.length;
    if (this.listChildren === 0) {
      if (this.expanded) {
        this.expanded = false;
      }
    }
  }
  /**
   *The number of visible child elements on elements that come before this element and contain the same root
   *
   * @type {string}
   * @memberof HicksListItem
   */
  @property({ type: Number, reflect: true })
  offset = 0;

  templates: {
    tags: {
      ul: unknown[];
    };
    slots: {
      suffix: TemplateResult | symbol;
      prefix: TemplateResult | symbol;
      link: TemplateResult | symbol;
    };
  };
  createSlot = (name: string) => html`
    <div class="item__content__${name}">
      <slot name="${name}"></slot>
    </div>
  `;

  constructor() {
    super();
    this.controllers = {} as any;

    this.controllers.item = new ListItemController(this, 'hicks-toc', '');
    this.controllers.item.observe.all().subscribe(([expanded, active]) => {
      this.expanded = expanded.has(this.path) || expanded.has('*');
      this.hidden =
        expanded.has(this.root) || !this.root.length || expanded.has('*')
          ? false
          : true;
      if (active.trim().length > 0) {
        this.active = this._path === active;
      }
    });

    this.tabIndex = 0;
  }
  updateSlots() {
    /*[EXPANDED] const show = this.hasListChildren;*/
    const slots = {
      suffix: false ? this.createSlot('suffix') : nothing,
      prefix: this.createSlot('prefix'),
      link: this.createSlot('link'),
    };
    const tags = {
      ul: true
        ? [literal`<ul class="sublist" role="group">`, literal`</ul>`]
        : [nothing, nothing],
    };
    this.templates = { slots, tags };
  }

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(_changedProperties);
    this.updateSlots();
    this.topLevel = this.position.length === 1;
  }
  willUpdate(_changedProperties: Map<string, unknown>) {
    super.willUpdate(_changedProperties);
    /*[EXPANDED] if (_changedProperties.has('hidden')) {
      this.tabIndex = this.hidden ? -1 : 0;
    }*/

    if (_changedProperties.has('listChildren')) {
      this.updateSlots();
    }
  }
  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    /*[EXPANDED] if (_changedProperties.has('offset')) {
      this.setCSSVar('--item--offset', this.offset);
    }*/
  }
  setCSSVar(name: string, value: string | number) {
    this.style.setProperty(name, String(value));
  }
  handleToggle(e: { target: { toggled: boolean } }) {
    this.expanded
      ? this.controllers.item.collapse([this.path])
      : this.controllers.item.expand([this.path]);
  }
  render(): TemplateResult {
    /*[EXPANDED]   let fadeIn = { 'transition--fade-in': !this.hidden };
      aria-expanded="${this.hasListChildren ? this.expanded : 'undefined'}"*/
    return html`<li
      role="${this.hasListChildren ? 'treeitem' : 'none'}"
      class="item"
    >
      <div class="item__content" @toggle="${this.handleToggle}">
        ${this.active && !this.topLevel
          ? html`<span style="padding-left: 0.4rem">◆</span>`
          : this.templates.slots.prefix}
        <a
          tabindex="0"
          role="treeitem"
          class="item__content__a"
          href="${this.link}"
        >
          ${this.templates.slots.link}
        </a>
        ${this.templates.slots.suffix}
      </div>
      ${this.templates.tags.ul[0]}
      <slot @slotchange="${this.refreshChildren}"></slot>
      ${this.templates.tags.ul[1]}
    </li> `;
  }
  static get styles() {
    return [style];
  }
}
