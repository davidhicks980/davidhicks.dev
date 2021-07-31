import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, queryAssignedNodes } from 'lit/decorators.js';
import { style } from './iconbutton.css';

@customElement('hicks-toggle-button')
export class HicksIconToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true }) toggled: boolean = false;
  @property({ type: String }) height: string = '2rem';
  @property({ type: String }) width: string = '2rem';

  @queryAssignedNodes('', true, 'svg')
  slottedIcon: NodeListOf<SVGElement>;

  private _toggleEvent: CustomEvent;

  constructor() {
    super();
    this._toggleEvent = new CustomEvent('toggle', {
      detail: { isToggled: this.toggled },
      bubbles: true,
      composed: true,
    });
  }
  handleClick(event: PointerEvent) {
    this.toggled = this.toggled ? false : true;
    this.dispatchEvent(this._toggleEvent);
    if (this.slottedIcon) {
      this.toggleIconClass();
    }
  }
  toggleIconClass() {
    this.toggled
      ? this.slottedIcon[0].classList.add('toggled')
      : this.slottedIcon[0].classList.remove('toggled');
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
