import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import { style } from './toggle.css';

export class HicksIconToggle extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = [style];
  @property({ type: Boolean, reflect: true }) toggled: boolean;
  @property({ type: String }) height = '2rem';
  @property({ type: String }) width = '2rem';

  @queryAssignedNodes('', true, 'svg')
  slottedIcon!: NodeListOf<SVGElement>;

  constructor() {
    super();
    this.toggled = false;
    this.tabIndex = 0;
  }
  handleClick(e: PointerEvent) {
    this.toggled = !this.toggled;
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
    window.requestAnimationFrame(() => {
      this.focus({ preventScroll: true });
    });
  }
  toggleIconClass() {
    this.slottedIcon[0].classList.toggle('toggled', this.toggled);
  }
  update(_changedProperties: PropertyValues) {
    super.update(_changedProperties);
    if (_changedProperties.has('toggled')) {
      this.toggleIconClass();
    }
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    if (_changedProperties.has('height') || _changedProperties.has('width')) {
      this.style.height = this.height;
      this.style.width = this.width;
    }
  }
  render(): TemplateResult {
    return html`
      <button tabindex="0" @click="${this.handleClick}" class="icon-button">
        <slot></slot>
      </button>
    `;
  }
}
