import { LitElement, html } from 'lit';
import { customElement, queryAssignedNodes, property } from 'lit/decorators.js';
import { isFilledArray } from '../../util/functions/is-filled-array';
import { style } from './nav-item.css';

export const NAV_ITEM_TAG_NAME = 'hicks-nav-item';

@customElement(NAV_ITEM_TAG_NAME)
export class NavItemComponent extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  @queryAssignedNodes('', true)
  slotButton!: NodeListOf<Text>;
  @property({ type: Boolean, reflect: true })
  selected = false;
  @property({ type: String, reflect: true })
  href = '';
  slotChangedCallback(e: Event) {
    if (this.href.length === 0) {
      this.href = isFilledArray(this.slotButton)
        ? '#' + this.slotButton[0].wholeText.toLowerCase()
        : '';
      this.requestUpdate();
    }
  }
  emitNavigation() {
    this.dispatchEvent(new CustomEvent('navigate', { bubbles: true }));
  }

  render() {
    return html`
      <a @click="${this.emitNavigation}" class="link" href="${this.href}">
        <span class="link__content">
          <slot @slotchange="${this.slotChangedCallback}"> </slot>
        </span>
      </a>
    `;
  }
  static get styles() {
    return [style];
  }
}
