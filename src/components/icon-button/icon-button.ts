import { LitElement, html, CSSResultGroup, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { style } from './iconbutton.css';
import { styleMap } from 'lit/directives/style-map.js';

export class HicksIconToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true }) toggled: boolean = false;
  @property({ type: String, reflect: true }) height: string = '2rem';
  @property({ type: String, reflect: true }) width: string = '2rem';

  @query('slot')
  slot;
  slottedIcon: SVGElement;

  private _toggleEvent: CustomEvent;

  constructor() {
    super();
    this._toggleEvent = new CustomEvent('toggle', {
      detail: { isToggled: this.toggled },
    });
  }
  handleClick = (event: PointerEvent) => {
    this.toggled = this.toggled ? false : true;
    this.dispatchEvent(this._toggleEvent);
    if (this.slottedIcon) {
      this.toggleIconClass();
    }
  };
  toggleIconClass() {
    this.toggled
      ? this.slottedIcon.classList.add('toggled')
      : this.slottedIcon.classList.remove('toggled');
  }
  handleSlottedIcon() {
    this.slottedIcon = (
      this.slot as HTMLSlotElement
    ).assignedNodes()[0] as SVGElement;
  }

  animatedIcon = () =>
    html`<slot @slotchange="${this.handleSlottedIcon}" name="icon"></slot>`;

  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has('height') || _changedProperties.has('width')) {
      this.style.height = this.height;
      this.style.width = this.width;
    }
  }
  render(): TemplateResult {
    return html`
      <button @click="${this.handleClick}" class="icon__button">
        ${this.animatedIcon()}
      </button>
    `;
  }
  static get styles(): CSSResultGroup[] {
    return [style];
  }
}
