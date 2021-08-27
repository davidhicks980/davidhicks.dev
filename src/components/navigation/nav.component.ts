import { LitElement, html } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedNodes,
} from 'lit/decorators.js';
import { style as navStyle } from './nav.css';
import { NavItemComponent } from './nav-item.component';
@customElement('hicks-nav')
export class NavComponent extends LitElement {
  @queryAssignedNodes('', true, 'hicks-nav-item')
  navItems!: NodeListOf<NavItemComponent>;
  @query('ul')
  navList!: HTMLUListElement;
  @property({ type: Boolean, reflect: true })
  opened = true;

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
