import { LitElement, html } from 'lit';
import { customElement, queryAssignedNodes, property } from 'lit/decorators.js';
import { isFilledArray } from '../../util/func';
import { style } from './navitem.css';
@customElement('hicks-nav-item')
export class NavItemComponent extends LitElement {
  @queryAssignedNodes('', true)
  slot;
  @property({ reflect: true })
  link = '';
  @property({ type: Boolean, reflect: true })
  selected = false;
  @property({ type: String, reflect: true })
  icon = '';

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
          <span class="link__content">
           <slot @slotchange="${this.slotChangedCallback}"> </slot
            >
            </span>
        </a>
      </li>
    `;
  }
  static get styles() {
    return [style];
  }
}
