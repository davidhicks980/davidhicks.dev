import { LitElement, html } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedNodes,
} from 'lit/decorators.js';
import { isFilledArray } from './util/func';
import { style as navItemStyle } from './navitem.css';
import { style as navStyle } from './nav.css';
@customElement('hicks-nav')
export class NavComponent extends LitElement {
  private _color = '';

  @queryAssignedNodes('', true, 'hicks-nav-item')
  navItems: NodeListOf<NavItemComponent>;
  @query('ul')
  navList: HTMLUListElement;
  @property({ type: Boolean, reflect: true })
  opened = true;
  @property({ type: Boolean, reflect: true })
  transitioning = false;
  @property({ type: String, reflect: true })
  get color() {
    return this._color;
  }
  set color(value) {
    if (typeof value === 'string') {
      const prev = this._color;
      this._color = value;
      this.style.setProperty('--nav--base-color', value);
      this.requestUpdate('color', prev);
    }
  }
  private _direction = 'row';
  @property({ reflect: true, attribute: true })
  orientation = 'row';

  constructor() {
    super();
  }

  handleNavigate(e) {
    this.navItems.forEach((item) => (item.selected = false));
    (e.target as NavItemComponent).selected = true;
  }

  render() {
    return html` <nav class="navigation" role="navigation">
      <slot class="navigation__slot" @navigate="${this.handleNavigate}"></slot>
    </nav>`;
  }
  static get styles() {
    return [navStyle];
  }
}

@customElement('hicks-nav-item')
export class NavItemComponent extends LitElement {
  @queryAssignedNodes('', true)
  slot;
  @property({ reflect: true })
  link = '';
  @property({ type: Boolean, reflect: true })
  selected = false;

  slotChangedCallback(e) {
    this.link = isFilledArray(this.slot)
      ? this.slot[0].wholeText.toLowerCase()
      : '';
    this.requestUpdate();
  }

  emitNavigation() {
    this.dispatchEvent(new CustomEvent('navigate', { bubbles: true }));
  }

  render() {
    return html`
        <a
          @click="${this.emitNavigation}"
          class="link"
          href="#${this.link}"
        >
    <span class="link__text">
           <slot @slotchange="${this.slotChangedCallback}"> </slot
            >
            </span>
        </a>
      </li>
    `;
  }
  static get styles() {
    return [navItemStyle];
  }
}
