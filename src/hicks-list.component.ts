import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hicks-list')
export class HicksList extends LitElement {
  @property()
  foo = 'foo';

  render() {
    return html`<ol>
      <slot></slot>
    </ol>`;
  }
}

@customElement('hicks-list-item')
export class HicksListItem extends LitElement {
  @property()
  render() {
    return html`<li>
      <slot></slot>
    </li>`;
  }
}
