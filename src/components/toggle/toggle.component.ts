import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import { style } from './toggle.css';

export class HicksToggle extends LitElement {
  @property({ type: Boolean, reflect: true }) toggled: boolean;
  @property({ type: String }) height: string = '2rem';
  @property({ type: String }) width: string = '2rem';

  @queryAssignedNodes('', true, 'svg')
  slottedIcon: NodeListOf<SVGElement>;

  constructor() {
    super();
    this.toggled = false;
  }
  handleClick(e: PointerEvent) {
    this.toggled = this.toggled ? false : true;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { isToggled: this.toggled },
        bubbles: true,
        composed: true,
      })
    );
    if (this.slottedIcon) {
      this.toggleIconClass();
    }
  }
  toggleIconClass() {
    this.slottedIcon[0].classList.toggle('toggled', this.toggled);
  }
  update(_changedProperties) {
    super.update(_changedProperties);
    if (_changedProperties.has('toggled')) {
      this.toggleIconClass();
    }
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has('height') || _changedProperties.has('width')) {
      this.style.height = this.height;
      this.style.width = this.width;
    }
  }
  render(): TemplateResult {
    return html`
      <button @click="${this.handleClick}" class="icon-button">
        <slot></slot>
      </button>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
