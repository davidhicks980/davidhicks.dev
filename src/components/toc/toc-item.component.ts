import { LitElement, nothing, TemplateResult } from 'lit';
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { style } from './tocitem.css';
import { BreakpointController } from '../../util/controllers/breakpoint.controller';
import { literal, html } from 'lit/static-html.js';

import { ListItemController } from '../../util/controllers/item.controller';
import { classMap } from 'lit/directives/class-map.js';
import { fromEvent } from 'rxjs';
import { ARROW_KEYS } from '../radio-group/keys.constants';
import { filter } from 'rxjs/operators';
/**
 *Allows focusing without having to typecase to an HTMLElement
 *
 * @param {Element} element
 */
function focus(element: Element): HTMLElement {
  (element as HTMLElement).focus();
  return element as HTMLElement;
}
const TAG_NAME = 'hicks-list-item';
@customElement(TAG_NAME)
export class HicksListItem extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  private _path: string = '';
  private _position: number[] = [0];

  @queryAssignedNodes('', true, TAG_NAME)
  childSlot: NodeListOf<HicksListItem>;
  @property({ type: Number, reflect: true })
  listChildren: number = 0;

  @property({ type: Boolean, reflect: true })
  active: boolean = false;
  @property({ type: Boolean, reflect: true })
  hidden: boolean = false;
  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;
  @property({ type: String })
  marker: string = '';
  @property({ type: Boolean, reflect: true })
  mobile: boolean = false;
  controllers: { item: ListItemController; breakpoint: BreakpointController };
  @property({ attribute: 'top-level', type: Boolean, reflect: true })
  topLevel: boolean;
  tabIndex = 0;
  refreshChildren() {
    this.listChildren = this.childSlot.length;
    if (this.listChildren === 0) {
      if (this.expanded) {
        this.expanded = false;
      }
    }
  }
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
  link: string = '';

  get hasListChildren() {
    return this.listChildren > 0;
  }

  /**
   *The number of visible child elements on elements that come before this element and contain the same root
   *
   * @type {string}
   * @memberof HicksListItem
   */
  @property({ type: Number, reflect: true })
  offset: number = 0;
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
    this.tabIndex = 0;
    this.controllers = {} as any;
    this.controllers.breakpoint = new BreakpointController(this);
    this.controllers.breakpoint
      .observe('mobile')
      .subscribe(([id, matches]) => (this[id] = matches ?? false));
    this.controllers.item = new ListItemController(this, 'hicks-toc', '');
    this.controllers.item.observe.all().subscribe(([expanded, active]) => {
      this.expanded = expanded.has(this.path) || expanded.has('*');
      this.hidden =
        expanded.has(this.root) || !this.root.length || expanded.has('*')
          ? false
          : true;
      this.active = this.path === active;
    });
    fromEvent(this, 'keydown')
      .pipe(filter((ev: KeyboardEvent) => ARROW_KEYS.includes(ev.key)))
      .subscribe((ev) => {
        if (ev.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        //Yes, yes. Fallthrough switch bad
        switch (ev.key) {
          case 'Down': // IE/Edge specific value
          case 'ArrowDown':
            // Do something for "down arrow" key press.
            if (this.hasListChildren && this.expanded) {
              this.childSlot[0].focus();
            } else if (this.nextElementSibling) {
              focus(this.nextElementSibling);
            } else {
              let nextParent = this.parentElement?.nextElementSibling;
              if (nextParent?.tagName === this.tagName) {
                focus(nextParent.shadowRoot.querySelector('a'));
              } else {
                focus(this.parentElement.firstElementChild);
              }
            }
            break;
          case 'Up': // IE/Edge specific value
          case 'ArrowUp':
            // Do something for "down arrow" key press.
            if (this.previousElementSibling?.tagName === this.tagName) {
              let el = this.previousElementSibling as HicksListItem;
              if (el.expanded && el.hasListChildren) {
                el.childSlot[el.childSlot.length - 1].focus();
              } else if (el.tagName === this.tagName) {
                focus(el);
              }
            } else {
              if (this.parentElement.tagName === this.tagName) {
                this.parentElement.shadowRoot.querySelector('a').focus();
              } else {
                focus(this.parentElement.lastElementChild);
              }
            }

            break;
          case 'Left': // IE/Edge specific value
          case 'ArrowLeft':
            this.controllers.item.collapse(this.path);
            break;
          case 'Right': // IE/Edge specific value
          case 'ArrowRight':
          case 'Enter':
            this.controllers.item.expand(this.path);
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        ev.preventDefault();
      });
  }
  updateSlots() {
    const show = this.hasListChildren;
    const slots = {
      suffix: show ? this.createSlot('suffix') : nothing,
      prefix: this.createSlot('prefix'),
      link: this.createSlot('link'),
    };
    const tags = {
      ul: show
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
    if (_changedProperties.has('hidden')) {
      this.tabIndex = this.hidden ? -1 : 0;
    }

    if (_changedProperties.has('listChildren')) {
      this.updateSlots();
    }
  }
  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('offset')) {
      this.setCSSVar('--item--offset', this.offset);
    }
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
    let fadeIn = { 'transition--fade-in': !this.hidden };
    return html`<li
      role="${this.hasListChildren ? 'treeitem' : 'none'}"
      aria-expanded="${this.hasListChildren ? this.expanded : 'undefined'}"
      class="item ${classMap(fadeIn)}"
    >
      <div class="item__content" @toggle="${this.handleToggle}">
        ${this.templates.slots.prefix}
        <a
          tabindex="0"
          role="treeitem"
          class="item__content__a"
          href="#${this.link}"
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
